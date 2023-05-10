import React from "react";

import { Icon, Icons } from '../../uiComponents/icon/Icon'

type Props = {
  isFavourite: boolean,
  onClick: () => void
}

export const FavouriteButton = ({isFavourite, onClick}: Props) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  }

  return (
    <button onClick={handleOnClick} className="favouriteButton">
      {isFavourite ? (
        <Icon
          icon={Icons.HEART_FILLED}
          alt="favourite"
          dimension={30}
        />
      ) : (
        <Icon
          icon={Icons.HEART}
          alt="favourite"
          dimension={30}
        />
      )}
    </button>
  )
}
