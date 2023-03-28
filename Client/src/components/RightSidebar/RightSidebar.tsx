import { shallow } from 'zustand/shallow'
import React from 'react'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'
import SelectedEdgeProps from './SelectedEdgeProps'
import SelectedNodeProps from './SelectedNodeProps'
import SidebarProps from './SidebarProps'

const selector = (state: RFState) => ({
  selectedNode: state.selectedNode,
  selectedEdge: state.selectedEdge,
})

const RightSidebar = () => {
  const { selectedNode, selectedEdge } = useFlowStore(selector, shallow)
  return (
    <aside
      className='hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block overscroll-auto hover:overscroll-contain h-[90vh] scrollbar scrollbar-transparent scrollbar-track-transparent sticky'>
      {selectedEdge && <SelectedEdgeProps />}
      {selectedNode && <SelectedNodeProps />}
      {!selectedNode && !selectedEdge && <SidebarProps />}
    </aside>
  )

}
export default RightSidebar
