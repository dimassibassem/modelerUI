import { Handle, NodeProps, NodeToolbar, Position, ReactFlowState, useStore } from 'reactflow'
import React, { MouseEvent, useRef, useState } from 'react'
import { useClickAnyWhere, useHover } from 'usehooks-ts'
import '@reactflow/node-resizer/dist/style.css'
import { NodeResizer } from '@reactflow/node-resizer'
import { Icon } from '@iconify/react'
import useShowToolbar from '../../hooks/useShowToolbar'

const connectionNodeIdSelector = (state: ReactFlowState) => state.connectionNodeId

const CustomNode = ({ id, isConnectable, dragging, selected }: NodeProps) => {
  const connectionNodeId = useStore(connectionNodeIdSelector)
  const isTarget = connectionNodeId && connectionNodeId !== id
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [showToolbar, setShowToolbar] = useState(false)
  useShowToolbar(isHover, dragging, setShowToolbar)
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(50)
  const [showResizer, setShowResizer] = useState(false)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 2) setShowResizer(true)
  }
  useClickAnyWhere((event) => {
    if (event.detail === 1) setShowResizer(false)
  })
  return (
    <button type='button' onClick={handleClick}>
      <div ref={hoverRef} className='min-h-[40px] w-full min-w-[50px] h-full'>
        <NodeToolbar isVisible={showToolbar} position={Position.Top}>
          <div className='flex flex-col bg-gray-200'>
            <h1 className='rounded-2xl text-gray-700 text-sm font-bold p-2'>
              help ???</h1>
          </div>
        </NodeToolbar>

        <NodeResizer color='#ff0071' isVisible={showResizer} minWidth={50}
                     minHeight={50} onResize={
          (event, props) => {
            setWidth(props.width)
            setHeight(props.height)
          }} />
        <Icon icon='fluent:oval-48-filled' color='#999' width={width}
              height={height} />

        <Handle
          style={{
            visibility: showResizer ? 'hidden' : 'visible',
            zIndex: 2,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '0',
            transform: 'none',
            border: 'none',
            opacity: 0
          }}
          position={Position.Right}
          type='source'
          isConnectable={isConnectable}
        />
        <Handle
          style={{
            visibility: showResizer ? 'hidden' : 'visible',
            zIndex: isTarget ? 3 : 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '0',
            transform: 'none',
            border: 'none',
            opacity: 0
          }}
          position={Position.Left}
          type='target'
          isConnectable={isConnectable}
        />
      </div>
    </button>
  )
}

export default CustomNode
