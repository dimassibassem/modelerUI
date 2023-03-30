import React from 'react'
import { Edge, Node, Panel, ReactFlowInstance } from 'reactflow'
import axios from 'axios'
import imageFromHTML from '@/utils/imageFromHtml'

const TopRightPanel = ({ setNodes, setEdges, reactFlowInstance, setOpenLoadModal }: {
                         setNodes: (nodes: Node[]) => void,
                         setEdges: (edges: Edge[]) => void,
                         reactFlowInstance: ReactFlowInstance | null,
                         setOpenLoadModal: (open: boolean) => void
                       }
) => (
  <Panel position='top-right' className='grid grid-cols-6 gap-1'>
    <button type='button'
            className='rounded bg-red-50 py-1 px-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-100'
            onClick={() => {
              setNodes([])
              setEdges([])
            }}>
      Clear
    </button>
    <button type='button'
            className='rounded bg-green-50 py-1 px-2 text-sm font-semibold text-green-700 shadow-sm hover:bg-green-100'
            onClick={async () => {
              const result = await imageFromHTML(reactFlowInstance)
              try {
                await axios.post(`${process.env.API_ENDPOINT}/api/add-model`, result)
              } catch (e) {
                console.error(e)
              }
            }}>
      Save
    </button>
    <button type='button'
            className='rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
            onClick={() => {
              if (reactFlowInstance) {
                reactFlowInstance.fitView()
              }
            }
            }>
      Fit view
    </button>

    <button type='button'
            className='rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
            onClick={() => {
              if (reactFlowInstance) {
                reactFlowInstance.zoomIn()
              }
            }
            }>
      Zoom in
    </button>
    <button type='button'
            className='rounded bg-indigo-50 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
            onClick={() => {
              if (reactFlowInstance) {
                reactFlowInstance.zoomOut()
              }
            }
            }>
      Zoom out
    </button>


    <button type='button'
            className='rounded bg-gray-100 py-1 px-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-200'
            onClick={() => setOpenLoadModal(true)}>
      Load
    </button>
  </Panel>
)

export default TopRightPanel
