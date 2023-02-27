import { ChangeEvent, useCallback } from 'react'
import { Handle, Position } from 'reactflow'

const handleStyle = { left: 10 }

const Parallelogram = ({ data }) => {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value)
  }, [])

  return (
    <div className='relative bg-no-repeat bg-center bg-contain h-[50px] w-full;'>
      <div className='w-[100px] h-[50px] skew-x-[20deg] bg-[#555]' />
      <Handle type='target' position={Position.Top} style={{ left: 50 }} />
      <div>
        {/* <label htmlFor="text">Text:</label> */}
        {/* <input id="text" name="text" onChange={onChange} /> */}
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} /> */}
      <Handle type='source' position={Position.Bottom} id='b' />
    </div>
  )
}

export default Parallelogram
