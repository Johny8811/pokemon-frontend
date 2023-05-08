import { useQuery } from '@apollo/client'
import { useState, useCallback } from "react";

import { POKEMONS_LIST } from '../../apollo/queries'
import { TabNavigation, ActiveTabState } from '../../components/tabNavigation/TabNavigation'
import { FavouriteButton } from '../../components/favouriteButton/FavouriteButton'

import './PokemonList.css'

export const PokemonList = () => {
  const { data } = useQuery(POKEMONS_LIST)
  const [tabNavigationState, setTabNavigationState] = useState<ActiveTabState>('all')

  const handleFavouritePokemon = useCallback((id: string) => () => {
    alert(`Favourite pokemon ${id}`)
  }, [])

  return (
      <div className="main">
        <TabNavigation activeTab={tabNavigationState} setActiveTab={setTabNavigationState} />
        <div className="grid">
          {data?.pokemons.edges.map(p => (
            <div key={p.id}>
              <img
                src={p.image}
                alt={p.name}
                className="pokemonImage"
              />
              <div className="pokemonDescription">
                <span>
                  <h3>
                    {p.name}
                  </h3>
                  <p>
                    {p.types.toString()}
                  </p>
                </span>
                <FavouriteButton
                  isFavourite={p.isFavorite}
                  onClick={handleFavouritePokemon(p.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}
