import { useEffect } from 'react'

function useRemoveWatermark() {
  return useEffect(() => {
    // Remove reactflow watermark
    document
      .querySelector(
        'div.react-flow__panel.react-flow__attribution.bottom.right'
      )
      ?.remove()
    // Remove reactflow minimap watermark
    document.querySelector('#react-flow__minimap-desc-1')?.remove()
  }, [])
}

export default useRemoveWatermark
