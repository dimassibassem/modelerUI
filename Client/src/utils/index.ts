import { Node } from 'reactflow'

const nodeColor = (node: Node) => {
  switch (node.type) {
    case 'start':
      return '#cdff54'
    case 'end':
      return '#6865A5'
    case 'trapezoid':
      return '#f88000'
    case 'hexagon':
      return '#ff05f1'
    case 'diamond':
      return '#86c20b'
    case 'circle':
      return '#00ffff'
    case 'square':
      return '#cdff54'
    default:
      return '#ff0072'
  }
}

export default nodeColor
