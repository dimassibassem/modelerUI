import NodeTypes from '../types/NodeTypes'

const nodeColor = (type: NodeTypes) => {
  switch (type) {
    case NodeTypes.Start:
      return '#cdff54'
    case NodeTypes.End:
      return '#6865A5'
    case NodeTypes.Execution:
      return '#ff05f1'
    case NodeTypes.Policies:
      return '#86c20b'
    case NodeTypes.Provisioners:
      return '#00ffff'
    case NodeTypes.Rule:
      return '#cdff54'
    default:
      return '#ff0072'
  }
}

export default nodeColor
