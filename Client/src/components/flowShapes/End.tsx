import { Connection, NodeProps, NodeToolbar, Position } from 'reactflow'
import { NodeResizer } from '@reactflow/node-resizer'
import '@reactflow/node-resizer/dist/style.css'
import { FC, memo, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { useHover } from 'usehooks-ts'
import { shallow } from 'zustand/shallow'
import useShowToolbar from '../../hooks/useShowToolbar'
import useStore from '../../store'
import { RFState } from '../../types/RFState'
import Handles from '../Handles'

const selector = (state: RFState) => ({
  nodes: state.nodes,
})
const End: FC<NodeProps> = ({ data, dragging, selected }) => {
  const { nodes } = useStore(selector, shallow)
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(50)
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [showToolbar, setShowToolbar] = useState(false)
  useShowToolbar(isHover, dragging, setShowToolbar)

  const isValidConnection = (connection: Connection) => {
    const { target } = connection
    const targetNode = nodes.find((node) => node.id === target)
    return data.connectableWith.includes(targetNode?.type)
  }

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
