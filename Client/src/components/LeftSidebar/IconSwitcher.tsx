import { Icon } from '@iconify/react'
import NodeType from '@/types/NodeType'

const IconSwitcher = ({ type }: { type: NodeType }) => {
  switch (type) {
    case NodeType.Start:
      return <Icon icon="mdi:asterisk-circle-outline" height={24} width={24} />
    case NodeType.End:
      return <Icon icon="mdi:circle-slice-8" height={24} width={24} />
    case NodeType.Policies:
      return <Icon icon="bi:diamond" height={24} width={24} />
    case NodeType.Execution:
      return (
        <Icon icon="material-symbols:hexagon-outline" height={24} width={24} />
      )
    case NodeType.Provisioners:
      return (
        <Icon icon="material-symbols:circle-outline" height={24} width={24} />
      )
    case NodeType.Rule:
      return (
        <Icon icon="material-symbols:square-outline" height={24} width={24} />
      )
    default:
      return null
  }
}

export default IconSwitcher
