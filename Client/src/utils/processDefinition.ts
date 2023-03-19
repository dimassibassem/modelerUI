import { Edge, Node } from 'reactflow'
import { createGraph, findAllPaths } from './graphPath'
import Process from '../types/Process'

const processDefinition = (nodes: Node[], edges: Edge[], setProcess: (process: Process) => void, process: Process) => {
  const startNode = nodes.find(node => node.type === 'start')
  const endNode = nodes.find(node => node.type === 'end')
  if (!startNode) {
    alert('Please add a start node')
    return
  }
  if (!endNode) {
    alert('Please add an end node')
    return
  }
  const graph = createGraph(nodes, edges)
  if (!startNode || !endNode) return
  const paths = findAllPaths(graph, startNode.id, endNode.id)
  if (paths.length === 0) {
    alert('No valid steps found')
    return
  }
  const steps = paths.map(path => path.map(nodeId => {
    const node = nodes.find(nd => nd.id === nodeId)
    return node?.type === 'start' || node?.type === 'end' ? { type: node?.type } : {
      type: node?.type,
      attributes: node?.data.attributes
    }
  }))
  console.log({ ...process, steps })
  setProcess({ ...process, steps } as Process)
}

export default processDefinition
