import React from 'react'
import { Panel } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { Icon } from '@iconify/react'
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'
import { useFlowStore } from '@/store'
import { RFState } from '@/types/store/RFState'
import saveModel from '@/utils/Flow/saveModel'
import tooltipStyle from '@/style/tooltip'
import State from '@/types/store/State'
import useStore from '@/store/stateStore'
import clearFlow from '@/utils/Flow/clearFlow'
import useHandleNotification from '@/hooks/useHandleNotification'

const selector = (state: RFState) => ({
  setNodesAndEdges: state.setNodesAndEdges,
  process: state.process,
  setProcess: state.setProcess
})
const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance,
  chainRecovery: state.chainRecovery,
  setChainRecovery: state.setChainRecovery,
  processId: state.processId,
  setProcessId: state.setProcessId
})

const TopRightPanel = () => {
  const { setNodesAndEdges, process } = useFlowStore(selector, shallow)
  const {
    reactFlowInstance,
    processId,
    setProcessId,
    chainRecovery,
    setChainRecovery
  } = useStore(selector2, shallow)
  const { t } = useTranslation()
  const handleNotif = useHandleNotification()
  return (
    <Panel
      id="top-right"
      position="top-right"
      className="grid grid-cols-3 gap-2"
    >
      <Tooltip id="TopRightCommands" delayShow={600} style={tooltipStyle} />
      <button
        type="button"
        data-tooltip-id="TopRightCommands"
        data-tooltip-content={t<string>('Clear')}
        aria-label="Clear"
        className="rounded flex justify-center bg-red-50 py-1 px-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-100"
        onClick={() => clearFlow(setNodesAndEdges)}
      >
        <Icon className="w-5 h-5" icon="fa-regular:trash-alt" />
      </button>
      <button
        type="button"
        data-tooltip-id="TopRightCommands"
        data-tooltip-content={t<string>('Save')}
        aria-label="Save"
        className="rounded bg-green-50 py-1 px-2 text-sm font-semibold text-green-700 shadow-sm hover:bg-green-100"
        onClick={() =>
          saveModel(
            reactFlowInstance,
            process,
            processId,
            setProcessId,
            handleNotif
          )
        }
      >
        <Icon className="w-5 h-5" icon="fa-regular:save" />
      </button>
      <button
        id="chainRecovery"
        data-tooltip-id="BottomLeftCommands"
        data-tooltip-content={t<string>('Chain Recovery')}
        aria-label="Chain Recovery"
        type="button"
        className="flex justify-center rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
        onClick={() => {
          setChainRecovery(!chainRecovery)
        }}
      >
        {chainRecovery ? (
          <Icon className="w-5 h-5" icon="fa:chain" />
        ) : (
          <Icon className="w-5 h-5" icon="fa:chain-broken" />
        )}
      </button>
    </Panel>
  )
}
export default TopRightPanel
