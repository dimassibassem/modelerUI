import { Connection, Handle, NodeProps, NodeToolbar, Position } from 'reactflow'
import '@reactflow/node-resizer/dist/style.css'
import { NodeResizer } from '@reactflow/node-resizer'
import { FC, memo, useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'
import { shallow } from 'zustand/shallow'
import CssFilterConverter from 'css-filter-converter'
import useShowToolbar from '../../hooks/useShowToolbar'
import circle from '../../assets/Circle.png'
import useStore from '../../store'
import { RFState } from '../../types/RFState'

const selector = (state: RFState) => ({
  nodes: state.nodes
})

const Circle: FC<NodeProps> = ({ data, selected, dragging }) => {
  const {
    nodes
  } = useStore(selector, shallow)
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(50)
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [showToolbar, setShowToolbar] = useState(false)
  useShowToolbar(isHover, dragging, setShowToolbar)
  const filter = CssFilterConverter.hexToFilter('#ec1111').color

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
      <div>
        <img src={circle} alt='circle' style={
          {
            width, height, filter: filter || 'none'
          }} />
        <div className='absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4'>{data.text}</div>
      </div>

      <Handle
        style={{ width: width / 15, height: width / 15 }}
        type='source' position={Position.Top}
        id='top'
        isValidConnection={isValidConnection}
      />
      <Handle
        style={{ width: width / 15, height: width / 15 }}
        position={Position.Bottom}
        type='source'
        id='bottom'
        isValidConnection={isValidConnection}
      />
      <Handle
        style={{ width: width / 15, height: width / 15 }}
        position={Position.Left}
        type='source'
        id='left'
        isValidConnection={isValidConnection}
      />
      <Handle
        style={{ width: width / 15, height: width / 15 }}
        position={Position.Right}
        type='source'
        id='right'
        isValidConnection={isValidConnection}
      />
    </div>
  )
}

export default memo(Circle)
