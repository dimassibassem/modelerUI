import React, { ComponentType, memo, useRef, useState } from 'react'
import { Handle, Node, NodeProps, NodeToolbar, Position } from 'reactflow'
import '@reactflow/node-resizer/dist/style.css'
import { NodeResizer } from '@reactflow/node-resizer'
import { Icon } from '@iconify/react'
import { useHover } from 'usehooks-ts'
import useShowToolbar from '../../hooks/useShowToolbar'

const Trapezoid: ComponentType<NodeProps<Node>> = ({ data, dragging, selected }) => {
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(50)
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [showToolbar, setShowToolbar] = useState(false)
  useShowToolbar(isHover, dragging, setShowToolbar)

  return (
    <div ref={hoverRef} className='min-h-[40px] w-full min-w-[50px] h-full'>
      <NodeToolbar isVisible={showToolbar} position={Position.Top}>
        <div className='flex flex-col bg-gray-200'>
          <h1 className='rounded-2xl text-gray-700 text-sm font-bold p-2'
          >help ???</h1>
        </div>
      </NodeToolbar>
      <NodeResizer color='#ff0071' isVisible={selected} minWidth={50} minHeight={50} onResize={
        (event, props) => {
          setWidth(props.width)
          setHeight(props.height)
        }
      } />
      <Icon icon='icon-park-solid:trapezoid' color='#999' width={width} height={height} />
      <Handle style={{ width: width / 15, height: width / 15 }}
              type='source'
              id='top' position={Position.Top} />
      <Handle style={{ width: width / 15, height: width / 15 }}
              type='source'
              id='bottom' position={Position.Bottom} />
    </div>
  )
}

export default memo(Trapezoid)
