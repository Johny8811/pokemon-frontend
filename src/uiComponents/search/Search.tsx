import { ChangeEvent } from 'react'

import './Search.css'

type Props = {
  onChange: (value: string) => void
}

export const Search = ({ onChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    onChange(value)
  }

  return (
    <input
      type="text"
      className="seachInput"
      placeholder="Seach"
      onChange={handleChange}
    />
  )
}
