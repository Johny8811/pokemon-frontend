import { ApolloCache, FetchResult } from "@apollo/client";

import { POKEMON_BY_ID } from "../../../apollo/queries";
import { SetUnFavoriteMutation, PokemonByIdQuery, PokemonByIdQueryVariables } from "../../../__generated__/graphql";

export const setUnFavouritePokemonCache = (pokemonId: string) =>
  (
    cache: ApolloCache<SetUnFavoriteMutation>,
    fetchResult: FetchResult<SetUnFavoriteMutation>
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

    if (cachedData?.pokemonById && fetchResult.data?.unFavoritePokemon) {
      const data = {
        pokemonById: {
          ...cachedData.pokemonById,
          isFavorite: fetchResult.data?.unFavoritePokemon?.isFavorite
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
