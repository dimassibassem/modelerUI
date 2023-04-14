import { shallow } from 'zustand/shallow'
import React from 'react'
import { Edge } from 'reactflow'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'
import SelectedEdgeProps from '@/components/RightSidebar/EdgeProps/SelectedEdgeProps'
import SelectedNodeProps from '@/components/RightSidebar/NodeProps/SelectedNodeProps'
import ProcessProps from '@/components/RightSidebar/ProcessProps/ProcessProps'

const selector = (state: RFState) => ({
  selected: state.selected as Edge
})

const RightSidebar = () => {
  const { selected } = useFlowStore(selector, shallow)
  return (
    <aside
      id="right-sidebar"
      className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block overscroll-auto hover:overscroll-contain h-[90vh] max-w-[30%] scrollbar scrollbar-transparent scrollbar-track-transparent sticky"
    >
      {selected && selected.source && <SelectedEdgeProps />}
      {selected && !selected.source && <SelectedNodeProps />}
      {!selected && <ProcessProps />}
    </aside>
  )
}
export default RightSidebar