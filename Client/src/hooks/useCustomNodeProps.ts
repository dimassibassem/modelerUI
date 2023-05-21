import { useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'
import NodeType from '@/types/NodeType'

function useCustomNodeProps(type: NodeType, w: number, h: number) {
  const [width, setWidth] = useState(w)
  const [height, setHeight] = useState(h)
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [showToolbar, setShowToolbar] = useState(false)

  return {
    width,
    height,
    setHeight,
    setWidth,
    hoverRef,
    isHover,
    showToolbar,
    setShowToolbar,
  }
}

export default useCustomNodeProps
