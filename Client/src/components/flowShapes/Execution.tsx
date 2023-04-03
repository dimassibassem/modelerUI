import React, { FC, memo } from 'react'
import { Position, NodeProps, NodeToolbar, NodeResizer } from 'reactflow'
import useShowToolbar from '@/hooks/useShowToolbar'
import execution from '@/assets/Hexagon.png'
import Handles from '@/components/Handles'
import useCustomNodeProps from '@/hooks/useCustomNodeProps'
import NodeTypes from '@/types/NodeTypes'
import { useTemporalStore } from '@/store'
import useHandleNodeSize from '@/hooks/useHandleNodeSize'

const Execution: FC<NodeProps> = ({ id, type, data, dragging, selected }) => {
  const { pause, resume } = useTemporalStore((state) => state)
  const {
    width,
    height,
    setHeight,
    setWidth,
    hoverRef,
    isHover,
    showToolbar,
    setShowToolbar,
    filter
  } = useCustomNodeProps(type as NodeTypes, 50, 50)

  useHandleNodeSize(id, setWidth, setHeight)
  useShowToolbar(isHover, dragging, setShowToolbar)
  return (
    <div ref={hoverRef} className='min-h-[40px] w-full min-w-[50px] h-full'>
      <NodeToolbar isVisible={showToolbar} position={Position.Top}>
        <div className='flex flex-col bg-gray-200'>
          <h1 className='rounded-2xl text-gray-700 text-sm font-bold p-2'
          >help ???</h1>
        </div>
      </NodeToolbar>
      <NodeResizer keepAspectRatio color='#ff0071' isVisible={selected} minWidth={50} minHeight={50}
                   onResizeStart={() => pause()}
                   onResize={
                     (event, props) => {
                       setWidth(props.width)
                       setHeight(props.height)
                     }
                   }
                   onResizeEnd={() => resume()}
      />
      <div>
        <img width={width}
             height={height}
             src={execution} alt='execution' style={
          {
            width, height,
            filter: filter || 'none'
          }} />
        <div className='absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4'>{data.text}</div>
      </div>

      <Handles
        width={width}
        handles={data.handles}
      />
    </div>
  )
}

export default memo(Execution)
