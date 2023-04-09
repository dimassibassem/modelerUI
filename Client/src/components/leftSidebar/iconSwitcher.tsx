import { Icon } from '@iconify/react'
import NodeTypes from '@/types/NodeTypes'

const iconSwitcher = (node: NodeTypes) => {
  switch (node) {
    case NodeTypes.Start:
      return <Icon icon="mdi:asterisk-circle-outline" height={24} width={24} />
    case NodeTypes.End:
      return <Icon icon="mdi:circle-slice-8" height={24} width={24} />
    case NodeTypes.Policies:
      return <Icon icon="bi:diamond" height={24} width={24} />
    case NodeTypes.Execution:
      return (
        <Icon icon="icon-park-outline:parallelogram" height={24} width={24} />
      )
    case NodeTypes.Provisioners:
      return (
        <Icon icon="material-symbols:circle-outline" height={24} width={24} />
      )
    case NodeTypes.Rule:
      return (
        <Icon icon="material-symbols:square-outline" height={24} width={24} />
      )
    default:
      return <div />
  }
}

export default iconSwitcher
