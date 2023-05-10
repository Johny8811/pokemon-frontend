import grid from '../../assest/grid.png'
import list from '../../assest/list.png'
import heart from '../../assest/heart.png'
import heartFilled from '../../assest/heart-filled.png'

export enum Icons {
  GRID,
  HEART,
  HEART_FILLED,
  LIST
}

const IconSources = {
  [Icons.GRID]: grid,
  [Icons.LIST]: list,
  [Icons.HEART]: heart,
  [Icons.HEART_FILLED]: heartFilled,
}

type Props = {
  icon: Icons,
  alt: string,
  dimension: number
}

export const Icon = ({ icon, alt, dimension }: Props) => {

  return (
    <img
      src={IconSources[icon]}
      alt={alt}
      style={{ width: `${dimension}px`, height: `${dimension}px` }}
    />
  )
}
