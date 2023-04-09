import { Edge, Node } from 'reactflow'
import { createGraph, findAllPaths } from './graphPath'
import Process from '@/types/Process'

const processDefinitionChecker = (
  nodes: Node[],
  edges: Edge[],
  setProcess: (process: Process) => void,
  process: Process
) => {
  const startNode = nodes.find((node) => node.type === 'start')
  const endNode = nodes.find((node) => node.type === 'end')
  if (!startNode || !endNode) {
    if (process.steps.length > 0)
      setProcess({ ...process, steps: [] } as Process)
    return
  }
  const graph = createGraph(nodes, edges)
  const paths = findAllPaths(graph, startNode.id, endNode.id)
  if (paths.length === 0) {
    if (process.steps.length > 0)
      setProcess({ ...process, steps: [] } as Process)
    return
  }
  const steps = paths.map((path) =>
    path.map((nodeId) => {
      const node = nodes.find((nd) => nd.id === nodeId)
      return node?.type === 'start' || node?.type === 'end'
        ? {
            id: node?.id,
            type: node?.type
          }
        : {
            id: node?.id,
            type: node?.type,
            attributes: node?.data.attributes
          }
    })
  )
  setProcess({ ...process, steps } as Process)
}

export default processDefinitionChecker
