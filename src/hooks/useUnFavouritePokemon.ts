import { useMutation } from "@apollo/client";

import { POKEMON_BY_ID } from "../apollo/queries";
import { SET_UN_FAVOURITE } from "../apollo/mutations";

export const useUnFavouritePokemon = (pokemonId: string) => {
  const [setUnFavourite, { loading }] = useMutation(SET_UN_FAVOURITE, {
    update: cache => {
      const cachedData = cache.readQuery({
        query: POKEMON_BY_ID,
        variables: {
          id: pokemonId
        }
      })

      if (cachedData?.pokemonById) {
        const data = {
          pokemonById: {
            ...cachedData.pokemonById,
            isFavorite: false
          }
        }

        cache.writeQuery({
          query: POKEMON_BY_ID,
          variables: {
            id: pokemonId
          },
          data
        })
      }
    }
  })

  return {
    setUnFavourite,
    loading
  }
}
