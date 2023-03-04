import { useEffect } from 'react'

function useShowToolbar(isHover: boolean, setShowToolbar: (show: boolean) => void) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isHover) {
        setShowToolbar(true)
      }
    }, 2000)
    return () => {
      setShowToolbar(false)
      clearTimeout(timeout)
    }
  }, [isHover, setShowToolbar])
}

export default useShowToolbar
