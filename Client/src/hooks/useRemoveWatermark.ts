import { useEffect } from 'react'

function useRemoveWatermark() {
  return useEffect(() => {
    document
      .querySelector(
        'div.react-flow__panel.react-flow__attribution.bottom.right'
      )
      ?.remove()
  }, [])
}

export default useRemoveWatermark
