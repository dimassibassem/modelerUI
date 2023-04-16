import NodeType from '@/types/NodeType'

const nodeColor = (type: NodeType) => {
  switch (type) {
    case NodeType.Start:
      return '#b2c711'
    case NodeType.End:
      return '#6865A5'
    case NodeType.Execution:
      return '#ff05f1'
    case NodeType.Policies:
      return '#86c20b'
    case NodeType.Provisioners:
      return '#00ffff'
    case NodeType.Rule:
      return '#cdff54'
    default:
      return '#ff0072'
  }
}

export default nodeColor
