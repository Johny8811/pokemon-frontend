import { useRef } from 'react'

import { Icon, Icons } from "../../../uiComponents/icon/Icon";

type Props = {
  src: string
}

export const Sound = ({ src }: Props) => {
  const sound = useRef(new Audio(src));

  return (
    <>
      <Icon
        icon={Icons.VOLUME}
        alt="Sound"
        dimension={30}
        onClick={() => {
          void sound.current.play();
        }}
      />
      {/*<audio>
        <source src={src} type="audio/ogg" />
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>*/}
    </>
  )
}
