import { useTranslation } from 'react-i18next'
import NodeTypes from '@/types/NodeTypes'

const DefinitionSwitcher = ({ type }: { type: NodeTypes }) => {
  const { t } = useTranslation()
  switch (type) {
    case NodeTypes.Start:
      return <span className="text-gray-500 pl-2">{t('StartContent')}</span>
    case NodeTypes.End:
      return <span className="text-gray-500 pl-2">{t('EndContent')}</span>
    case NodeTypes.Policies:
      return <span className="text-gray-500 pl-2">{t('PoliciesContent')}</span>
    case NodeTypes.Execution:
      return <span className="text-gray-500 pl-2">{t('ExecutionContent')}</span>
    case NodeTypes.Provisioners:
      return (
        <span className="text-gray-500 pl-2">{t('ProvisionersContent')}</span>
      )
    case NodeTypes.Rule:
      return <span className="text-gray-500 pl-2">{t('RuleContent')}</span>
    default:
      return null
  }
}

export default DefinitionSwitcher
