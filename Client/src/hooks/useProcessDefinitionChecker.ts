import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import processDefinitionChecker from '@/utils/Process/processDefinitionChecker'
import { useFlowStore } from '@/store'
import { RFState } from '@/types/store/RFState'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  process: state.process,
  setProcess: state.setProcess
})

const useProcessDefinitionChecker = () => {
  const { nodes, edges, process, setProcess } = useFlowStore(selector, shallow)
  return useEffect(() => {
    // if (nodes.some((node) => !node.dragging)) {
    processDefinitionChecker(nodes, edges, setProcess, process)
    // }
  }, [nodes, edges, setProcess])
}

export default useProcessDefinitionChecker
