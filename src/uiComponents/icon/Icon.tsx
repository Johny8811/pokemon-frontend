import React from "react";

import grid from '../../assest/grid.png'
import list from '../../assest/list.png'
import heart from '../../assest/heart.png'
import heartFilled from '../../assest/heart-filled.png'
import volume from '../../assest/volume.png'

export enum Icons {
  GRID,
  HEART,
  HEART_FILLED,
  LIST,
  VOLUME
}

const IconSources = {
  [Icons.GRID]: grid,
  [Icons.LIST]: list,
  [Icons.HEART]: heart,
  [Icons.HEART_FILLED]: heartFilled,
  [Icons.VOLUME]: volume
}

type Props = {
  icon: Icons;
  alt: string;
  dimension: number;
  className?: string;
  onClick?: () => void;
}

export const Icon = ({ icon, alt, dimension, onClick, className }: Props) => {
  const handleOnClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    onClick?.();
  }
  return (
      <img
        src={IconSources[icon]}
        alt={alt}
        style={{ width: `${dimension}px`, height: `${dimension}px` }}
        className={className}
        onClick={handleOnClick}
      />
  )
}
