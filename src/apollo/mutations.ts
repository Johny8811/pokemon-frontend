import { gql } from '../__generated__/gql'

export const SET_FAVOURITE = gql(`
    mutation SetFavourite($id: ID!) {
      favoritePokemon(id: $id) {
        isFavorite
      }
    }
`)

export const SET_UN_FAVOURITE = gql(`
  mutation SetUnFavorite($id: ID!) {
    unFavoritePokemon(id: $id) {
      isFavorite
    }
  }
`);
