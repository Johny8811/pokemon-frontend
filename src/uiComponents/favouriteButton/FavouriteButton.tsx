import React from "react";

import heart from '../../assest/heart.png'
import heartFilled from '../../assest/heart-filled.png'
import './FavouriteButton.css'

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
        <img
          src={heartFilled}
          alt="favourite"
        />
      ) : (
        <img
          src={heart}
          alt="favourite"
        />
      )}
    </button>
  )
}
