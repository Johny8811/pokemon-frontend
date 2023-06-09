import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from '@apollo/client'
import { Link } from "react-router-dom";

import { POKEMON_TYPES, PokemonListQueryFilter, POKEMONS_LIST } from '../../apollo/queries'
import { ActiveTabState, TabNavigation } from '../../uiComponents/tabNavigation/TabNavigation'
import { Search } from '../../uiComponents/search/Search'
import { SelectInput } from '../../uiComponents/select/SelectInput'
import { Icon, Icons } from '../../uiComponents/icon/Icon'

import { FavouriteButton } from './components/FavouriteButton'
import { useBottomReached } from './hooks/useBottomReached'
import './PokemonList.css'

const POKEMONS_FETCH_LIMIT = 15

enum Layot {
  LIST,
  GRID
}

export const PokemonList = () => {
  const [tabNavigationState, setTabNavigationState] = useState<ActiveTabState>('all')
  const [searchPokemon, setSearchPokemon] = useState<string | null>(null)
  const [selectedPokemonType, setSelectedPokemonType] = useState<string>('')
  const [layout, setLayout] = useState<Layot>(Layot.GRID)

  const pokemonListQueryFilter: PokemonListQueryFilter = useMemo(() => {
    return {
      isFavorite: tabNavigationState === 'favorites',
      type: selectedPokemonType
    }
  }, [tabNavigationState, selectedPokemonType])

  const { data: pokemonsData, refetch, fetchMore } = useQuery(POKEMONS_LIST, {
    variables: {
      limit: POKEMONS_FETCH_LIMIT,
      filter: pokemonListQueryFilter
    }
  })

  const fetchMorePokemons = useCallback(() => {
    void fetchMore({
      variables: {
        offset: pokemonsData?.pokemons.edges.length || POKEMONS_FETCH_LIMIT,
      },
    });
  }, [pokemonsData?.pokemons.edges])

  // TODO: improve hook - remove external dependencies
  useBottomReached({
    offsetLength: pokemonsData?.pokemons.edges.length || 0,
    onBottomReached: fetchMorePokemons
  })

  const { data: pokemonTypesData } = useQuery(POKEMON_TYPES)

  const handleChangePokemonType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPokemonType(e.target.value)
  }

  useEffect(() => {
    setSearchPokemon(null)
  }, [pokemonListQueryFilter.isFavorite])

  useEffect(() => {
    if (searchPokemon) {
      void refetch({
        search: searchPokemon
      })
    }
  }, [searchPokemon])

  return (
    <div className="main">
      <TabNavigation activeTab={tabNavigationState} setActiveTab={setTabNavigationState} />
      <div className="pokemonsFilters">
        <Search value={searchPokemon} onChange={setSearchPokemon} />
        {pokemonTypesData?.pokemonTypes && (
          <SelectInput
            value={selectedPokemonType}
            items={pokemonTypesData?.pokemonTypes}
            defaultItem="All"
            onChange={handleChangePokemonType}
          />
        )}
        <div className="layout">
          <Icon
            icon={Icons.GRID}
            alt="Grid"
            dimension={30}
            className="layoutToggleBtn"
            onClick={() => setLayout(Layot.GRID)}
          />
          <Icon
            icon={Icons.LIST}
            alt="List"
            dimension={30}
            className="layoutToggleBtn"
            onClick={() => setLayout(Layot.LIST)}
          />
        </div>
      </div>
      <div className={layout === Layot.GRID ? "grid" : "list"}>
        {pokemonsData?.pokemons.edges.map(p => (
          <div key={p.id} className="pokemonItem">
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
                  className="likeButton"
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
