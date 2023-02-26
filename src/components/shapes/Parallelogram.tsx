import { ChangeEvent, useCallback } from 'react'
import { Handle, Position } from 'reactflow'
import './parallelogram.css'

const handleStyle = { left: 10 }

const Parallelogram = ({ data }) => {
  const onChange = useCallback((evt:ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value)
  }, [])

  return (
    <div className="handles-container">
    <div className='parallelogram'/>
      <Handle type='target' position={Position.Top} style={{left:50}} />
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
