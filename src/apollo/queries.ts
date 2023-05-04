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
