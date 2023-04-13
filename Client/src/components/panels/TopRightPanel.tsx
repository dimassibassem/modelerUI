import React from 'react'
import { Panel, ReactFlowInstance } from 'reactflow'
import axios from 'axios'
import { shallow } from 'zustand/shallow'
import { Icon } from '@iconify/react'
import imageFromHTML from '@/utils/imageFromHtml'
import { useFlowStore, useTemporalStore } from '@/store'
import { RFState } from '@/types/RFState'

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges
})
const TopRightPanel = ({
  reactFlowInstance,
  setOpenLoadModal
}: {
  reactFlowInstance: ReactFlowInstance | null
  setOpenLoadModal: (open: boolean) => void
}) => {
  const { setNodes, setEdges, nodes, edges } = useFlowStore(selector, shallow)
  const { pause, resume } = useTemporalStore((state) => state)
  return (
    <Panel
      id="top-right"
      position="top-right"
      className="grid grid-cols-3 gap-2"
    >
      <button
        type="button"
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
        aria-label="Save"
        className="rounded bg-green-50 py-1 px-2 text-sm font-semibold text-green-700 shadow-sm hover:bg-green-100"
        onClick={async () => {
          const result = await imageFromHTML(reactFlowInstance)
          try {
            await axios.post(
              `${process.env.API_ENDPOINT}/api/add-model`,
              result
            )
          } catch (e) {
            console.error(e)
          }
        }}
      >
        <Icon
          className="w-5 h-5"
          icon="material-symbols:save-outline-rounded"
        />
      </button>
      <button
        type="button"
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
