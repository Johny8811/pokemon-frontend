import { gql } from '../__generated__/gql'

export const POKEMONS_LIST = gql(`
    query pokemons($limit: Int, $offset: Int, $filter: PokemonFilterInput, $search: String) {
        pokemons(query: { limit: $limit, offset: $offset, filter: $filter, search: $search }) {
            edges {
                id
                name
                types
                image
                isFavorite
            }
        }
    }
`)

export type PokemonListQueryFilter = Partial<{
  type: string,
  isFavorite: boolean
}>

export const POKEMON_BY_ID = gql(`
    query pokemonById($id: ID!) {
        pokemonById(id: $id) {
            id
            name
            types
            image
            weight {
                minimum
                maximum
            }
            height {
                minimum
                maximum
            }
            maxCP
            maxHP
            sound
            isFavorite
        }
    }
`)

export const POKEMON_TYPES = gql(`
  query PokemonTypes {
    pokemonTypes
  }
`)
