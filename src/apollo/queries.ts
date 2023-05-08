import { gql } from '../__generated__/gql'

export const POKEMONS_LIST = gql(`
    query pokemons {
        pokemons(query: { limit: 20 }) {
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
