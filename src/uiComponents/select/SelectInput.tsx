import { ChangeEvent } from "react";

import "./SelectInput.css"

type Props = {
  value: string,
  items: string[],
  defaultItem: string,
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectInput = ({ value, items, defaultItem, onChange }: Props) => {
  return (
    <select value={value} onChange={onChange} className="selectInput">
      <option value="">{defaultItem}</option>
      {items.map(t => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  )
}
