import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { useCallback } from 'react'

import { POKEMON_BY_ID } from '../../apollo/queries'
import { FavouriteButton } from "../../uiComponents/favouriteButton/FavouriteButton";
import { SET_FAVOURITE, SET_UN_FAVOURITE } from "../../apollo/mutations";

import { setFavouritePokemonCache } from './cache/favouritePokemon'
import { setUnFavouritePokemonCache } from './cache/unFavouritePokemon'
import { Sound } from './components/Sound'

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

  const [setFavourite] = useMutation(SET_FAVOURITE, {
    update: setFavouritePokemonCache(pokemonId)
  })
  const [setUnFavourite] = useMutation(SET_UN_FAVOURITE, {
    update: setUnFavouritePokemonCache(pokemonId)
  })

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
                  <h3>{pokemonData.name}</h3>
                  <p>{pokemonData.types}</p>
              </span>
              <span>
                <Sound src={pokemonData.sound} />
                <FavouriteButton
                  isFavourite={pokemonData.isFavorite}
                  onClick={handleFavouritePokemon(pokemonData.id)}
                />
              </span>
            </div>
            <div className="power">
              <div>CP: <b>{pokemonData.maxCP}</b></div>
              <div>HP: <b>{pokemonData.maxHP}</b></div>
            </div>
            <div className="properties">
              <div>
                <h4>Weight</h4>
                {pokemonData.weight.maximum} - {pokemonData.weight.minimum}
              </div>
              <div>
                <h4>Height</h4>
                {pokemonData.height.maximum} - {pokemonData.height.minimum}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
