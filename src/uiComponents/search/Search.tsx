import { ChangeEvent } from 'react'

import './Search.css'

type Props = {
  value: string | null,
  onChange: (value: string) => void
}

export const Search = ({ value, onChange }: Props) => {
  const inputValue = value || ''
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    onChange(value)
  }

  return (
    <input
      type="text"
      className="seachInput"
      placeholder="Seach"
      value={inputValue}
      onChange={handleChange}
    />
  )
}
