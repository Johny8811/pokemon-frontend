import { useCallback } from "react";
import { useMutation } from "@apollo/client";

import { FavouriteButton as FavouriteButtonUI } from '../../../uiComponents/favouriteButton/FavouriteButton'
import { SET_FAVOURITE, SET_UN_FAVOURITE } from "../../../apollo/mutations";
import { PokemonListQueryFilter, POKEMONS_LIST } from '../../../apollo/queries'

import { setFavouritePokemonCache } from "../cache/favouritePokemon";

type Props = {
  isFavorite: boolean;
  pokemonId: string;
  pokemonListQueryFilter: PokemonListQueryFilter;
  className?: string;
}

export const FavouriteButton = ({
  isFavorite,
  pokemonId,
  pokemonListQueryFilter,
  className,
}: Props) => {
  const [setFavourite] = useMutation(SET_FAVOURITE, {
    update: setFavouritePokemonCache(pokemonId, pokemonListQueryFilter),
  })
  const [setUnFavourite] = useMutation(SET_UN_FAVOURITE, {
    // TODO: investigate: how cache is updated?
    // update: setUnFavouritePokemonCache(pokemonId, pokemonListQueryFilter)
    refetchQueries: [POKEMONS_LIST, 'pokemons']
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
