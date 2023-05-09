import { useMutation } from "@apollo/client";

import { POKEMON_BY_ID } from "../apollo/queries";
import { SET_FAVOURITE } from "../apollo/mutations";

export const useFavouritePokemon = (pokemonId: string) => {
  const [setFavourite, { loading }] = useMutation(SET_FAVOURITE, {
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
            isFavorite: true
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
    setFavourite,
    loading
  }
}
