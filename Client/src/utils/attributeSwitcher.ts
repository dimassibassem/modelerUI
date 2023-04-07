import NodeTypes from '@/types/NodeTypes'

type AttributeMap = {
  [key in Exclude<NodeTypes, NodeTypes.Start | NodeTypes.End>]: {
    name: string,
    challenge?: string,
    enricher?: string,
    channel: string
  }
}

const attributeSwitcher = (type: keyof AttributeMap): AttributeMap[keyof AttributeMap] => {
  const attributeMap: AttributeMap = {
    [NodeTypes.Policies]: {
      name: '',
      channel: ''
    },
    [NodeTypes.Provisioners]: {
      name: '',
      challenge: '',
      channel: ''
    },
    [NodeTypes.Rule]: {
      name: '',
      enricher: '',
      channel: ''
    },
    [NodeTypes.Execution]: {
      name: '',
      channel: ''
    }
  }

  return attributeMap[type] || {}
}

export default attributeSwitcher
