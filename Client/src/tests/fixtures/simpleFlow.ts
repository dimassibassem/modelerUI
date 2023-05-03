import { Edge, Node } from 'reactflow'

const nodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
    selected: false
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
    selected: false
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
    selected: false
  }
]

const edges: Edge[] = [
  {
    id: '1',
    source: '1',
    target: '2',
    type: 'smoothstep',
    label: 'Edge 1',
    selected: false
  },
  {
    id: '2',
    source: '2',
    target: '3',
    type: 'smoothstep',
    label: 'Edge 2',
    selected: false
  }
]

export { nodes, edges }
