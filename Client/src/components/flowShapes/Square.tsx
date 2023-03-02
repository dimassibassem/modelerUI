import { Handle, Position, Node } from 'reactflow'
import React, { memo, useState } from 'react'
import '@reactflow/node-resizer/dist/style.css'
import { NodeResizer } from '@reactflow/node-resizer'
import { Icon } from '@iconify/react';

const Square = ({ data, selected }: Node) => {
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(50)
  return (
    <div className='min-h-[40px] w-full min-w-[50px] h-full'>
      <NodeResizer color='#ff0071' isVisible={selected} minWidth={50} minHeight={50} onResize={
        (event, props) => {
          setWidth(props.width)
          setHeight(props.height)
        }
      } />
      <Icon icon="material-symbols:square" color="#999" width={width} height={height} />
      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} id='b' />
    </div>
  )
}


export default memo(Square)
