import { useCallback } from "react";
import { useMutation } from "@apollo/client";

import { FavouriteButton as FavouriteButtonUI } from '../../../uiComponents/favouriteButton/FavouriteButton'
import { SET_FAVOURITE, SET_UN_FAVOURITE } from "../../../apollo/mutations";
import { PokemonListQueryFilter } from '../../../apollo/queries'

import { setFavouritePokemonCache } from "../cache/favouritePokemon";
import { setUnFavouritePokemonCache } from "../cache/unFavouritePokemon";

type Props = {
  isFavorite: boolean,
  pokemonId: string,
  pokemonListQueryFilter: PokemonListQueryFilter
}

export const FavouriteButton = ({
  isFavorite,
  pokemonId,
  pokemonListQueryFilter
}: Props) => {
  const [setFavourite] = useMutation(SET_FAVOURITE, {
    update: setFavouritePokemonCache(pokemonId, pokemonListQueryFilter)
  })
  const [setUnFavourite] = useMutation(SET_UN_FAVOURITE, {
    update: setUnFavouritePokemonCache(pokemonId, pokemonListQueryFilter)
  })

  const handleFavouritePokemon = useCallback(() =>  {
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
  }, [isFavorite, pokemonId])

  return (
    <FavouriteButtonUI
      isFavourite={isFavorite}
      onClick={handleFavouritePokemon}
    />
  )
}
