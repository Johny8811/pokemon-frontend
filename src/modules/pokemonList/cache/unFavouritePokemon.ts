import { ApolloCache, FetchResult } from "@apollo/client";

import { POKEMONS_LIST } from "../../../apollo/queries";
import { SetUnFavoriteMutation, PokemonsQuery, PokemonsQueryVariables } from "../../../__generated__/graphql";

export const setUnFavouritePokemonCache = (pokemonId: string) =>
  (
    cache: ApolloCache<SetUnFavoriteMutation>,
    fetchResult: FetchResult<SetUnFavoriteMutation>
  ) => {
    const cachedData = cache.readQuery<
      PokemonsQuery,
      PokemonsQueryVariables
    >({
      query: POKEMONS_LIST,
    })

    if (cachedData?.pokemons && fetchResult.data?.unFavoritePokemon) {
      const data = cachedData?.pokemons.edges.map(p => {
        if (p.id === pokemonId) {
          return {
            ...p,
            // TODO: investigate "false" default value
            isFavorite: fetchResult.data?.unFavoritePokemon?.isFavorite || false
          }
        }

        return p
      })

      cache.writeQuery({
        query: POKEMONS_LIST,
        data: {
          pokemons: {
            edges: data
          }
        }
      })
    }
  }
