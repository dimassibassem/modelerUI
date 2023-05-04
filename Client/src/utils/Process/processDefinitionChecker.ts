import { Edge, Node } from 'reactflow'
import { createGraph, findAllPaths } from '@/utils/Flow/graphPath'
import Process from '@/types/Process'
import NodeType from '@/types/NodeType'

const processDefinitionChecker = (
  nodes: Node[],
  edges: Edge[],
  setProcess: (process: Process) => void,
  process: Process
) => {
  const startNode = nodes.find((node) => node.type === NodeType.Start)
  const endNode = nodes.find((node) => node.type === NodeType.End)

  if (!startNode || !endNode) {
    if (process.steps.length > 0) {
      setProcess({ ...process, steps: [] })
    }
    return
  }

  const graph = createGraph(nodes, edges)
  const paths = findAllPaths(graph, startNode.id, endNode.id)

  if (paths.length === 0) {
    if (process.steps.length > 0) {
      setProcess({ ...process, steps: [] })
    }
    return
  }

  const steps = paths.map((path) => {
    return path
      .map((nodeId) => {
        const node = nodes.find((nd) => nd.id === nodeId)
        if (node) {
          return {
            id: node.id,
            type: node.type,
            attributes: node.data.attributes
          }
        }
      })
      .filter((step) => step !== undefined)
  })

  steps.forEach((step) => {
    if (step[0]?.type === NodeType.Start) {
      step.shift()
    }
    if (step[step.length - 1]?.type === NodeType.End) {
      step.pop()
    }
  })

  setProcess({ ...process, steps } as Process)
}

export default processDefinitionChecker
