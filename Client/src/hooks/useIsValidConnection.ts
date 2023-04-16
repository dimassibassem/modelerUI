import { Connection } from 'reactflow'

import { shallow } from 'zustand/shallow'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const selector = (state: RFState) => ({
  nodes: state.nodes
})
const useIsValidConnection = () => {
  const { nodes } = useFlowStore(selector, shallow)
  return (connection: Connection): boolean => {
    const { target, source } = connection
    const targetNode = nodes.find((node) => node.id === target)
    const sourceNode = nodes.find((node) => node.id === source)
    return sourceNode?.data.connectableWith.includes(targetNode?.type)
  }
}

export default useIsValidConnection
