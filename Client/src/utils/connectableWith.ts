import NodeTypes from '../types/NodeTypes'

const connectableWith = (type: NodeTypes): NodeTypes[] => {
  switch (type) {
    case NodeTypes.Start:
      return [NodeTypes.End, NodeTypes.Policies, NodeTypes.Execution, NodeTypes.Provisioners, NodeTypes.Rule]
    case NodeTypes.End:
      return []
    case NodeTypes.Policies:
      return [NodeTypes.End, NodeTypes.Policies, NodeTypes.Execution, NodeTypes.Rule]
    case NodeTypes.Provisioners:
      return [NodeTypes.End, NodeTypes.Policies, NodeTypes.Execution, NodeTypes.Provisioners, NodeTypes.Rule]
    case NodeTypes.Rule:
      return [NodeTypes.End, NodeTypes.Execution, NodeTypes.Provisioners, NodeTypes.Rule]
    case NodeTypes.Execution:
      return [NodeTypes.End, NodeTypes.Policies, NodeTypes.Provisioners, NodeTypes.Rule]
    default:
      return [NodeTypes.End, NodeTypes.Policies, NodeTypes.Execution, NodeTypes.Provisioners]
  }
}

export default connectableWith
