import { Edge, Node } from 'reactflow'

let nodes: Node[] = [
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

const setNodes = (nds: Node[]) => {
  nodes = nds
}

let edges: Edge[] = [
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
const setEdges = (eds: Edge[]) => {
  edges = eds
}

let lastNodeIdNumber = 3
const setLastNodeIdNumber = (id: number) => {
  lastNodeIdNumber = id
}

let notificationData = {
  message: '',
  success: false
}
const setNotificationData = (data: { message: string; success: boolean }) => {
  notificationData = data
}

let openNotification = false

const setOpenNotification = (open: boolean) => {
  openNotification = open
}

let paused = false

const pause = () => {
  paused = true
}

const resume = () => {
  paused = false
}

export {
  nodes,
  setNodes,
  edges,
  setEdges,
  lastNodeIdNumber,
  setLastNodeIdNumber,
  notificationData,
  setNotificationData,
  openNotification,
  setOpenNotification,
  pause,
  resume
}



