import React from "react";

import { Icon, Icons } from '../../uiComponents/icon/Icon'

type Props = {
  isFavourite: boolean,
  onClick: () => void
}

export const FavouriteButton = ({ isFavourite, onClick }: Props) => {
  return isFavourite ? (
    <Icon
      icon={Icons.HEART_FILLED}
      alt="favourite"
      dimension={30}
      onClick={onClick}
    />
  ) : (
    <Icon
      icon={Icons.HEART}
      alt="favourite"
      dimension={30}
      onClick={onClick}
    />
  )
}
