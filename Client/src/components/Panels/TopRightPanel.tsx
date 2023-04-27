import React from 'react'
import { Panel } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { Icon } from '@iconify/react'
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'
import { useFlowStore, useTemporalStore } from '@/store'
import { RFState } from '@/types/RFState'
import saveModel from '@/utils/Flow/saveModel'
import tooltipStyle from '@/style/tooltip'
import State from '@/types/State'
import useStore from '@/store/stateStore'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  process: state.process,
  setProcess: state.setProcess
})
const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance,
  setOpenLoadModal: state.setOpenLoadModal,
  setNotificationData: state.setNotificationData,
  setOpenNotification: state.setOpenNotification
})

const TopRightPanel = () => {
  const { setNodes, setEdges, nodes, edges, process } = useFlowStore(
    selector,
    shallow
  )
  const {
    reactFlowInstance,
    setOpenLoadModal,
    setNotificationData,
    setOpenNotification
  } = useStore(selector2, shallow)
  const { pause, resume } = useTemporalStore((state) => state)
  const { t } = useTranslation()
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
        onClick={() => {
          setNodes(nodes)
          setEdges(edges)
          pause()
          setEdges([])
          setNodes([])
          resume()
        }}
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
            setOpenNotification
          )
        }
      >
        <Icon
          className="w-5 h-5"
          icon="material-symbols:save-outline-rounded"
        />
      </button>
      <button
        type="button"
        data-tooltip-id="TopRightCommands"
        data-tooltip-content={t<string>('Import')}
        aria-label="Import"
        className="rounded flex justify-center bg-gray-100 py-1 px-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-200"
        onClick={() => setOpenLoadModal(true)}
      >
        <Icon className="w-5 h-5" icon="uil:import" />
      </button>
    </Panel>
  )
}
export default TopRightPanel
