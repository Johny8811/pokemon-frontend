import { ApolloCache, FetchResult } from "@apollo/client";

import { POKEMONS_LIST } from "../../../apollo/queries";
import { SetFavouriteMutation, PokemonsQuery, PokemonsQueryVariables } from "../../../__generated__/graphql";

export const setFavouritePokemonCache = (pokemonId: string) =>
  (
    cache: ApolloCache<SetFavouriteMutation>,
    fetchResult: FetchResult<SetFavouriteMutation>
  ) => {
    const cachedData = cache.readQuery<
      PokemonsQuery,
      PokemonsQueryVariables
    >({
      query: POKEMONS_LIST,
    })

    if (cachedData?.pokemons && fetchResult.data?.favoritePokemon) {
      const data = cachedData?.pokemons.edges.map(p => {
        if (p.id === pokemonId) {
          return {
            ...p,
            // TODO: investigate "false" default value
            isFavorite: fetchResult.data?.favoritePokemon?.isFavorite || false
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
