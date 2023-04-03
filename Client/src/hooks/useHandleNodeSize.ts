import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const selector = (state: RFState) => ({
  nodes: state.nodes
})
const useHandleNodeSize = (id: string, setWidth: (width: number) => void, setHeight: (height: number) => void) => {
  const { nodes } = useFlowStore(selector, shallow)
  return (useEffect(() => {
    setWidth(nodes.find((node) => node.id === id)?.width || 50)
    setHeight(nodes.find((node) => node.id === id)?.height || 50)
  }, [nodes]))
}

export default useHandleNodeSize
