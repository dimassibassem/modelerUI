import { Handle, NodeProps, NodeToolbar, Position } from 'reactflow'
import React, { FC, memo, useRef, useState } from 'react'
import '@reactflow/node-resizer/dist/style.css'
import { NodeResizer } from '@reactflow/node-resizer'
import { Icon } from '@iconify/react'
import { useHover } from 'usehooks-ts'
import useShowToolbar from '../../hooks/useShowToolbar'
import rect from '../../assets/Rect.png'
import CssFilterConverter from 'css-filter-converter'

const Square: FC<NodeProps> = ({ data, dragging, selected }) => {
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(50)
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [showToolbar, setShowToolbar] = useState(false)
  useShowToolbar(isHover, dragging, setShowToolbar)
  const filter = CssFilterConverter.hexToFilter('#1f17ef').color
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
      <img src={rect} alt='rect' style={
        {
          width, height, filter: filter || 'none'
        }
      } />
      <Handle style={{ width: width / 15, height: width / 15 }}
              type='source'
              id='top' position={Position.Top} />
      <Handle style={{ width: width / 15, height: width / 15 }}
              type='source'
              id='bottom' position={Position.Bottom} />
      <Handle
        style={{ width: width / 15, height: width / 15 }}
        position={Position.Left}
        type='source'
        id='left'
      />
      <Handle
        style={{ width: width / 15, height: width / 15 }}
        position={Position.Right}
        type='source'
        id='right'
      />
    </div>
  )
}


export default memo(Square)
