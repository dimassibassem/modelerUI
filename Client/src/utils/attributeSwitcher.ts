import NodeTypes from '@/types/NodeTypes'

const attributeSwitcher = (type: NodeTypes) => {
  switch (type) {
    case NodeTypes.Policies:
      return {
        name: '',
        channel: ''
      }
    case NodeTypes.Provisioners:
      return {
        name: '',
        challenge: '',
        channel: ''
      }
    case NodeTypes.Rule:
      return {
        name: '',
        enricher: '',
        channel: ''
      }
      case NodeTypes.Execution:
      return {
        name: '',
        channel: ''
      }
    default:
      return {}
  }
}
export default attributeSwitcher
