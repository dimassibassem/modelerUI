import { NodeProps, NodeToolbar, Position } from 'reactflow'
import { NodeResizer } from '@reactflow/node-resizer'
import '@reactflow/node-resizer/dist/style.css'
import { FC, memo } from 'react'
import { Icon } from '@iconify/react'
import useShowToolbar from '../../hooks/useShowToolbar'
import Handles from '../Handles'
import useCustomNodeProps from '../../hooks/useCustomNodeProps'

const End: FC<NodeProps> = ({ type, data, dragging, selected }) => {
  const {
    width,
    height,
    setHeight,
    setWidth,
    hoverRef,
    isHover,
    showToolbar,
    setShowToolbar,
    isValidConnection
  } = useCustomNodeProps(data, type, 50, 50)

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
      <Icon icon='mdi:circle-slice-8' color='#999' width={width} height={height} />
      <Handles
        width={width}
        handles={data.handles}
        isValidConnection={isValidConnection}
      />
    </div>
  )
}
export default memo(End)
