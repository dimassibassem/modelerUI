import { ChangeEvent, useCallback } from 'react'
import { Handle, Position } from 'reactflow'

const handleStyle = { left: 10 }

const Circle = ({ data }) => {
  return (
    <div className='relative bg-no-repeat bg-center bg-contain h-[50px] w-full'>
      <div className='w-[50px] h-[50px] rounded-[50%] bg-red-700' />
      <Handle type='target' position={Position.Left} />
      <div>
        {/* <label htmlFor="text">Text:</label> */}
        {/* <input id="text" name="text" onChange={onChange} /> */}
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} /> */}
      <Handle type='source' position={Position.Right} id='b' />
    </div>
  )
}

export default Circle
