import { useEffect } from "react";

const THRESHOLD = 50 // in 'px'

type Props = {
  offsetLength: number,
  onBottomReached: () => void
}

let bottomReached= false

export const useBottomReached = ({ onBottomReached, offsetLength }: Props) => {
  useEffect(() => {
    const scrollListener = () => {
      const pageHeight= document.documentElement.offsetHeight
      const windowHeight= window.innerHeight
      const scrollPosition= window.scrollY ||
        document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

      if ((pageHeight <= windowHeight + scrollPosition + THRESHOLD) && !bottomReached) {
        bottomReached = true
        onBottomReached()
      }

      if (pageHeight > windowHeight + scrollPosition + THRESHOLD) {
        bottomReached = false
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [offsetLength])
}
