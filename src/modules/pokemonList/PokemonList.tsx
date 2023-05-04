import { useQuery } from '@apollo/client'

import { POKEMONS_LIST } from '../../apollo/queries'

import './PokemonList.css'

export const PokemonList = () => {
  const { data } = useQuery(POKEMONS_LIST)

  return (
      <div>
        {data?.pokemons.edges.map(p => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
    )
}
