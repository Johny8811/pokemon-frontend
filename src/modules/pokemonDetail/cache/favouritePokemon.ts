import { ApolloCache, FetchResult } from "@apollo/client";

import { POKEMON_BY_ID } from "../../../apollo/queries";
import { SetFavouriteMutation, PokemonByIdQuery, PokemonByIdQueryVariables } from "../../../__generated__/graphql";

export const setFavouritePokemonCache = (pokemonId: string) =>
  (
    cache: ApolloCache<SetFavouriteMutation>,
    fetchResult: FetchResult<SetFavouriteMutation>
  ) => {
    const cachedData = cache.readQuery<
      PokemonByIdQuery,
      PokemonByIdQueryVariables
    >({
      query: POKEMON_BY_ID,
      variables: {
        id: pokemonId
      }
    })

    if (cachedData?.pokemonById && fetchResult.data?.favoritePokemon) {
      const data = {
        pokemonById: {
          ...cachedData.pokemonById,
          isFavorite: fetchResult.data?.favoritePokemon?.isFavorite
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
