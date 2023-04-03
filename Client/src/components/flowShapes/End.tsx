import { NodeProps, NodeToolbar, Position, NodeResizer } from 'reactflow'
import React, { FC, memo } from 'react'
import useShowToolbar from '@/hooks/useShowToolbar'
import Handles from '@/components/Handles'
import useCustomNodeProps from '@/hooks/useCustomNodeProps'
import NodeTypes from '@/types/NodeTypes'
import end from '@/assets/end.png'
import useHandleNodeSize from '@/hooks/useHandleNodeSize'
import { useTemporalStore } from '@/store'

const End: FC<NodeProps> = ({ id, type, data, dragging, selected }) => {
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

  useShowToolbar(isHover, dragging, setShowToolbar)
  useHandleNodeSize(id, setWidth, setHeight)
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
        <img src={end} alt='end' style={
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
export default memo(End)
