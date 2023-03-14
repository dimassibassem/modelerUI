import { shallow } from 'zustand/shallow'
import { useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'
import CssFilterConverter from 'css-filter-converter'
import { Connection } from 'reactflow'
import { RFState } from '../types/RFState'
import useStore from '../store'
import nodeColor from '../utils/nodeColor'

const selector = (state: RFState) => ({
  nodes: state.nodes
})

function useCustomNodeProps(data: any, type: string | undefined, w: number, h: number) {
  const { nodes } = useStore(selector, shallow)
  const [width, setWidth] = useState(w)
  const [height, setHeight] = useState(h)
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [showToolbar, setShowToolbar] = useState(false)
  const filter = CssFilterConverter.hexToFilter(nodeColor(type)).color

  const isValidConnection = (connection: Connection) => {
    const { target } = connection
    const targetNode = nodes.find((node) => node.id === target)
    return data.connectableWith.includes(targetNode?.type)
  }
  return {
  width, height, setHeight, setWidth, hoverRef, isHover, showToolbar, setShowToolbar, filter, isValidConnection
  }
}

export default useCustomNodeProps
