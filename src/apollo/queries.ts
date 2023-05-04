import { gql } from '@apollo/client'

export const POKEMONS_LIST = gql`
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
`
