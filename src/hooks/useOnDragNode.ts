import { DragEvent, useCallback } from 'react'

function useOnDragNode() {
  return useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])
}

export default useOnDragNode
