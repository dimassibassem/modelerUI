import { ChangeEvent, useCallback } from 'react'
import { Handle, Position } from 'reactflow'

const Trapezoid = ({ data }) => {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value)
  }, [])

  return (
    <div className='h-0 w-[125px] border-b-[50px] border-b-[#555] border-x-[25px] border-x-transparent border-solid;'>
      <Handle type='target' position={Position.Top} />
      <div>
         <label htmlFor="text">Text:</label>
         <input id="text" style={{width:80}} name="text" onChange={onChange} />
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} /> */}
      <Handle type='source' position={Position.Bottom} id='b' />
    </div>
  )
}

export default Trapezoid
