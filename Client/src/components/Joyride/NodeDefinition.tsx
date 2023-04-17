import { useTranslation } from 'react-i18next'
import NodeType from '@/types/NodeType'

const NodeDefinition = ({ type }: { type: NodeType }) => {
  const { t } = useTranslation()
  switch (type) {
    case NodeType.Start:
      return <span className="text-gray-500 pl-2">{t('StartContent')}</span>
    case NodeType.End:
      return <span className="text-gray-500 pl-2">{t('EndContent')}</span>
    case NodeType.Policies:
      return <span className="text-gray-500 pl-2">{t('PoliciesContent')}</span>
    case NodeType.Execution:
      return <span className="text-gray-500 pl-2">{t('ExecutionContent')}</span>
    case NodeType.Provisioners:
      return (
        <span className="text-gray-500 pl-2">{t('ProvisionersContent')}</span>
      )
    case NodeType.Rule:
      return <span className="text-gray-500 pl-2">{t('RuleContent')}</span>
    default:
      return null
  }
}

export default NodeDefinition
