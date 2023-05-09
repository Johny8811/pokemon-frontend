import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useCallback } from 'react'

import { POKEMON_BY_ID } from '../../apollo/queries'
import { FavouriteButton } from "../../components/favouriteButton/FavouriteButton";
import { useFavouritePokemon } from "../../hooks/useFavouritePokemon";
import { useUnFavouritePokemon } from "../../hooks/useUnFavouritePokemon";
import './PokemonDetail.css'

type PokemonDetailParams = {
  pokemonId: string
}

export const PokemonDetail = () => {
  const { pokemonId } = useParams<PokemonDetailParams>() as PokemonDetailParams;
  const { data } = useQuery(POKEMON_BY_ID, {
    variables: {
      id: pokemonId
    }
  });

  const { setFavourite } = useFavouritePokemon(pokemonId)
  const { setUnFavourite } = useUnFavouritePokemon(pokemonId)

  const handleFavouritePokemon = useCallback((id: string) => async () => {
    if (!data?.pokemonById?.isFavorite) {
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
  }, [pokemonId, data?.pokemonById?.isFavorite])

  const pokemonData = data?.pokemonById;

  return (
    <main className="pokemonDetail">
      {pokemonData && (
        <div className="pokemonContent">
          <img
            src={pokemonData.image}
            alt={pokemonData.name}
            className="pokemonImage"
          />
          <div className="information">
            <div className="description">
              <span>
                  <div>{pokemonData.name}</div>
                  <div>{pokemonData.types}</div>
              </span>
              <FavouriteButton
                isFavourite={pokemonData.isFavorite}
                onClick={handleFavouritePokemon(pokemonData.id)}
              />
            </div>
            <div className="power">
              <div>CP: {pokemonData.maxCP}</div>
              <div>HP: {pokemonData.maxHP}</div>
            </div>
            <div className="properties">
              <div>
                <div>Weight</div>
                {pokemonData.weight.maximum} - {pokemonData.weight.minimum}
              </div>
              <div>
                <div>Height</div>
                {pokemonData.height.maximum} - {pokemonData.height.minimum}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
