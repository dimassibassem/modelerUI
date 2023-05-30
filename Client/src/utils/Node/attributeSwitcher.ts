import NodeType from '@/types/enums/NodeType'

const attributeSwitcher = (type: NodeType) => {
  switch (type) {
    case NodeType.Policies:
      return {
        name: '',
        channel: ''
      }
    case NodeType.Provisioners:
      return {
        name: '',
        challenge: '',
        channel: ''
      }
    case NodeType.Rule:
      return {
        name: '',
        enricher: '',
        channel: ''
      }
    case NodeType.Execution:
      return {
        name: '',
        channel: ''
      }
    default:
      return {}
  }
}
export default attributeSwitcher
