import { useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'
import CssFilterConverter from 'css-filter-converter'
import nodeColor from '@/utils/Node/nodeColor'
import NodeTypes from '@/types/NodeTypes'

function useCustomNodeProps(type: NodeTypes, w: number, h: number) {
  const [width, setWidth] = useState(w)
  const [height, setHeight] = useState(h)
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [showToolbar, setShowToolbar] = useState(false)
  const filter = CssFilterConverter.hexToFilter(nodeColor(type)).color

  return {
    width,
    height,
    setHeight,
    setWidth,
    hoverRef,
    isHover,
    showToolbar,
    setShowToolbar,
    filter
  }
}

export default useCustomNodeProps
