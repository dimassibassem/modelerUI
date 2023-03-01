import React from 'react'
import { Edge, Node, Panel, ReactFlowInstance } from 'reactflow'
import { toPng } from 'html-to-image'
import axios from 'axios'

const imageFromHTML = async (reactFlowInstance: ReactFlowInstance) => {
  if (reactFlowInstance) {
    const reactFlow = document.querySelector('.react-flow') as HTMLElement
    const dataURI = await toPng(reactFlow, {
      filter: (node) =>
        // we don't want to add the minimap and the controls and the panel to the image
        !(node?.classList?.contains('react-flow__minimap') ||
          node?.classList?.contains('react-flow__controls') ||
          node?.classList?.contains('react-flow__panel'))
    })
    const instance = reactFlowInstance.toObject()

    await axios.post('http://localhost:3001/api/add-model', {
        instance,
        dataURI
      }
    )
  }
}
const CustomPanel = ({ setNodes, setEdges, reactFlowInstance, setOpenLoadModal }: {
                       setNodes: (nodes: Node[]) => void,
                       setEdges: (edges: Edge[]) => void,
                       reactFlowInstance: ReactFlowInstance | null,
                       setOpenLoadModal: (open: boolean) => void
                     }
) => (
  <Panel position='top-right' className='bg-gray-600 p-1'>
    <button type='button' className='bg-gray-200 m-1 p-1' onClick={() => {
      setNodes([])
      setEdges([])
    }}>
      Clear
    </button>
    <button type='button' className='bg-gray-200 m-1 p-1' onClick={async () => {
      await imageFromHTML(reactFlowInstance)
    }
    }>
      Save
    </button>
    <button type='button' className='bg-gray-200 m-1 p-1' onClick={() => {
      if (reactFlowInstance) {
        reactFlowInstance.fitView()
      }
    }
    }>
      Fit view
    </button>

    <button type='button' className='bg-gray-200 m-1 p-1' onClick={() => {
      if (reactFlowInstance) {
        reactFlowInstance.zoomIn()
      }
    }
    }>
      Zoom in
    </button>
    <button type='button' className='bg-gray-200 m-1 p-1' onClick={() => {
      if (reactFlowInstance) {
        reactFlowInstance.zoomOut()
      }
    }
    }>
      Zoom out
    </button>
    <button type='button' className='bg-gray-200 m-1 p-1' onClick={() => {
      if (reactFlowInstance) {
        reactFlowInstance.zoomTo(1)
      }
    }
    }>
      Zoom to 1
    </button>

    <button type='button' className='bg-gray-200 m-1 p-1' onClick={() => {
      if (reactFlowInstance) {
        reactFlowInstance.zoomTo(0.5)
      }
    }
    }>
      Zoom to 0.5
    </button>

    <button type='button' className='bg-gray-200 m-1 p-1' onClick={async () => {
      setOpenLoadModal(true)
    }
    }>
      Load
    </button>
  </Panel>
)

export default CustomPanel
