import React from 'react'
import { Panel } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { Icon } from '@iconify/react'
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'
import { useFlowStore } from '@/store'
import { RFState } from '@/types/RFState'
import saveModel from '@/utils/Flow/saveModel'
import tooltipStyle from '@/style/tooltip'
import State from '@/types/State'
import useStore from '@/store/stateStore'
import clearFlow from '@/utils/Flow/clearFlow'

const selector = (state: RFState) => ({
  setNodesAndEdges: state.setNodesAndEdges,
  process: state.process,
  setProcess: state.setProcess
})
const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance,
  setNotificationData: state.setNotificationData,
  setOpenNotification: state.setOpenNotification,
  modelID: state.modelID,
  setModelID: state.setModelID
})

const TopRightPanel = () => {
  const { setNodesAndEdges, process } = useFlowStore(selector, shallow)
  const {
    reactFlowInstance,
    setNotificationData,
    setOpenNotification,
    modelID,
    setModelID
  } = useStore(selector2, shallow)
  const { t } = useTranslation()
  return (
    <Panel
      id="top-right"
      position="top-right"
      className="grid grid-cols-2 gap-2"
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
        <Icon className="w-5 h-5" icon="ic:outline-clear" />
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
            setNotificationData,
            modelID,
            setModelID,
            setOpenNotification
          )
        }
      >
        <Icon
          className="w-5 h-5"
          icon="material-symbols:save-outline-rounded"
        />
      </button>
    </Panel>
  )
}
export default TopRightPanel
