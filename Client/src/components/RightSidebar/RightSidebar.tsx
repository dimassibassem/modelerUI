import { shallow } from 'zustand/shallow'
import React from 'react'
import { Edge } from 'reactflow'
import { RFState } from '@/types/store/RFState'
import { useFlowStore } from '@/store'
import SelectedEdgeProps from '@/components/RightSidebar/EdgeProps/SelectedEdgeProps'
import SelectedNodeProps from '@/components/RightSidebar/NodeProps/SelectedNodeProps'
import ProcessProps from '@/components/RightSidebar/ProcessProps/ProcessProps'
import State from '@/types/store/State'
import useStore from '@/store/stateStore'

const selector = (state: RFState) => ({
  selected: state.selected as Edge
})

const selector2 = (state: State) => ({
  reactFlowInstance: state.reactFlowInstance
})

const RightSidebar = () => {
  const { selected } = useFlowStore(selector, shallow)
  const { reactFlowInstance } = useStore(selector2, shallow)
  return (
    <aside
      id="right-sidebar"
      className="hidden w-96 bg-white p-8 overflow-y-auto border-l border-gray-200 lg:block h-[90vh] max-w-[30%] "
    >
      {selected && selected.source && <SelectedEdgeProps />}
      {selected && !selected.source && (
        <SelectedNodeProps reactFlowInstance={reactFlowInstance} />
      )}
      {!selected && <ProcessProps />}
    </aside>
  )
}
export default RightSidebar
