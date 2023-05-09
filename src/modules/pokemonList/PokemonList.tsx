import { useState, useMemo, useEffect } from "react";
import { useQuery } from '@apollo/client'
import { Link } from "react-router-dom";

import { POKEMONS_LIST, PokemonListQueryFilter } from '../../apollo/queries'
import { TabNavigation, ActiveTabState } from '../../uiComponents/tabNavigation/TabNavigation'

import { FavouriteButton } from './components/FavouriteButton'
import './PokemonList.css'

export const PokemonList = () => {
  const [tabNavigationState, setTabNavigationState] = useState<ActiveTabState>('all')

  const pokemonListQueryFilter: PokemonListQueryFilter = useMemo(() => {
    return {
      isFavorite: tabNavigationState === 'favorites'
    }
  }, [tabNavigationState])

  const { data, refetch } = useQuery(POKEMONS_LIST, {
    variables: {
      filter: pokemonListQueryFilter
    },
  })

  useEffect(() => {
    if (pokemonListQueryFilter.isFavorite) {
      void refetch({
        filter: pokemonListQueryFilter
      })
    }
  }, [pokemonListQueryFilter])

  return (
      <div className="main">
        <TabNavigation activeTab={tabNavigationState} setActiveTab={setTabNavigationState} />
        <div className="grid">
          {data?.pokemons.edges.map(p => (
            <div key={p.id}>
              <Link to={`/pokemon/${p.id}`}>
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
                    pokemonId={p.id}
                    isFavorite={p.isFavorite}
                    pokemonListQueryFilter={pokemonListQueryFilter}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
}
