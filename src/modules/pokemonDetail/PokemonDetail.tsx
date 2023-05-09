import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { useCallback, useEffect } from 'react'

import { POKEMON_BY_ID } from '../../apollo/queries'
import { FavouriteButton } from "../../components/favouriteButton/FavouriteButton";
import './PokemonDetail.css'

export const PokemonDetail = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const [getPokemonById, { data, }] = useLazyQuery(POKEMON_BY_ID);

  useEffect(() => {
    if (pokemonId) {
      void getPokemonById({
        variables: {
          id: pokemonId
        }
      })
    }
  }, [pokemonId])

  const handleFavouritePokemon = useCallback((id: string) => async () => {
    // TODO: add/remove from favourite
  }, [])

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
