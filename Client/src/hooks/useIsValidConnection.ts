import { Connection } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import { RFState } from '@/types/store/RFState'
import { useFlowStore } from '@/store'
import capitalize from '@/utils/capitalize'
import useHandleNotification from '@/hooks/useHandleNotification'

const selector = (state: RFState) => ({
  nodes: state.nodes
})

const useIsValidConnection = () => {
  const { nodes } = useFlowStore(selector, shallow)
  const handleNotif = useHandleNotification()
  const { t } = useTranslation()
  return (connection: Connection): boolean => {
    const { target, source } = connection
    const targetNode = nodes.find((node) => node.id === target)
    const sourceNode = nodes.find((node) => node.id === source)
    if (sourceNode?.data.connectableWith.includes(targetNode?.type)) {
      return true
    }
    if (targetNode?.type && sourceNode?.type) {
      handleNotif({
        success: false,
        message: t('Cannot create a connection from {{source}} to {{target}}', {
          source: capitalize(t(sourceNode.type)),
          target: capitalize(t(targetNode.type))
        })
      })
    }
    return false
  }
}
export default useIsValidConnection
