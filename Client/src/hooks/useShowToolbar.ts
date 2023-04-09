import { useEffect } from 'react'

function useShowToolbar(
  isHover: boolean,
  dragging: boolean,
  setShowToolbar: (show: boolean) => void
) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isHover && !dragging) {
        setShowToolbar(true)
      }
    }, 2000)
    return () => {
      setShowToolbar(false)
      clearTimeout(timeout)
    }
  }, [dragging, isHover, setShowToolbar])
}

export default useShowToolbar
