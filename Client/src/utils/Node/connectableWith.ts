import NodeType from '@/types/enums/NodeType'

const connectableWith = (type: NodeType): NodeType[] => {
  switch (type) {
    case NodeType.Start:
      return [
        NodeType.End,
        NodeType.Policies,
        NodeType.Execution,
        NodeType.Provisioners,
        NodeType.Rule
      ]
    case NodeType.End:
      return []
    case NodeType.Policies:
      return [
        NodeType.End,
        NodeType.Policies,
        NodeType.Execution,
        NodeType.Rule
      ]
    case NodeType.Provisioners:
      return [
        NodeType.End,
        NodeType.Policies,
        NodeType.Execution,
        NodeType.Provisioners,
        NodeType.Rule
      ]
    case NodeType.Rule:
      return [
        NodeType.End,
        NodeType.Execution,
        NodeType.Provisioners,
        NodeType.Rule
      ]
    case NodeType.Execution:
      return [
        NodeType.End,
        NodeType.Policies,
        NodeType.Provisioners,
        NodeType.Rule
      ]
    default:
      return [
        NodeType.End,
        NodeType.Policies,
        NodeType.Execution,
        NodeType.Provisioners
      ]
  }
}

export default connectableWith
