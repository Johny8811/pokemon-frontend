import { useEffect } from "react";

const THRESHOLD = 1 // in 'px'

type Props = {
  onBottomReached: () => void
}

export const useBottomReached = ({ onBottomReached }: Props) => {
  useEffect(() => {
    const scrollListener = () => {
      const pageHeight= document.documentElement.offsetHeight
      const windowHeight= window.innerHeight
      const scrollPosition= window.scrollY ||
        document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);


      if (pageHeight <= windowHeight + scrollPosition + THRESHOLD) {
        onBottomReached()
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])
}
