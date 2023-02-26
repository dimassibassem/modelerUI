import { ChangeEvent, useCallback } from 'react'
import { Handle, Position } from 'reactflow'
import './trapezoid.css'

const Trapezoid = ({ data }) => {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value)
  }, [])

  return (
    <div className='trapezoid'>
      <Handle type='target' position={Position.Top} />
      <div>
         <label htmlFor="text">Text:</label>
         <input id="text" style={{width:100}} name="text" onChange={onChange} />
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} /> */}
      <Handle type='source' position={Position.Bottom} id='b' />
    </div>
  )
}

export default Trapezoid
