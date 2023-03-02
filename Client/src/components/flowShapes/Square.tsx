import { Handle, Position } from 'reactflow'
import { NodeResizer } from '@reactflow/node-resizer'
import { memo } from 'react'
import '@reactflow/node-resizer/dist/style.css';

const handleStyle = { left: 10 }

const Square = ({ data, selected }) => (
    <div className=''>
      <NodeResizer color='#ff0071' isVisible={selected} minWidth={100} minHeight={30} />
      <div className=' w-auto h-auto bg-indigo-700 p-4 ' />
      <Handle type='target' position={Position.Left} />
      <div>
        {/* <label htmlFor="text">Text:</label> */}
        {/* <input id="text" name="text" onChange={onChange} /> */}
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} /> */}
      <Handle type='source' position={Position.Right} id='b' />
    </div>
  )

export default memo(Square)
