import { useCallback } from "react";
import { useMutation } from "@apollo/client";

import { FavouriteButton as FavouriteButtonUI } from '../../../uiComponents/favouriteButton/FavouriteButton'
import { SET_FAVOURITE, SET_UN_FAVOURITE } from "../../../apollo/mutations";

import { setFavouritePokemonCache } from "../cache/favouritePokemon";
import { setUnFavouritePokemonCache } from "../cache/unFavouritePokemon";

type Props = {
  isFavorite: boolean,
  pokemonId: string
}

export const FavouriteButton = ({ isFavorite, pokemonId }: Props) => {
  const [setFavourite] = useMutation(SET_FAVOURITE, {
    update: setFavouritePokemonCache(pokemonId)
  })
  const [setUnFavourite] = useMutation(SET_UN_FAVOURITE, {
    update: setUnFavouritePokemonCache(pokemonId)
  })

  const handleFavouritePokemon = useCallback((id: string) => () => {
    if (!isFavorite) {
      void setFavourite({
        variables: {
          id: pokemonId
        }
      })
    } else {
      void setUnFavourite({
        variables: {
          id: pokemonId
        }
      })
    }
  }, [isFavorite])

  return (
    <FavouriteButtonUI
      isFavourite={isFavorite}
      onClick={handleFavouritePokemon(pokemonId)}
    />
  )
}
