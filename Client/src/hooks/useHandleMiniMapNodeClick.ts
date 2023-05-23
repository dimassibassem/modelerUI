import React, { useEffect } from 'react'
import { Node } from 'reactflow'

const UseHandleMiniMapNodeClick = (
  clickedNode: Node | null,
  setClickedNode: React.Dispatch<React.SetStateAction<Node | null>>
) =>
  useEffect(() => {
    if (clickedNode) {
      const timer = setTimeout(() => {
        setClickedNode(null)
      }, 500)
      return () => clearTimeout(timer)
    }
    return () => {}
  }, [clickedNode])

export default UseHandleMiniMapNodeClick
