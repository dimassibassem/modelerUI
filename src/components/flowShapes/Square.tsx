import { Handle, Position } from 'reactflow'

const handleStyle = { left: 10 }

const Square = ({ data }) => {
  return (
    <div className=''>
      <div className=' w-[60px] h-[60px] bg-indigo-700 ' />
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

export default Square
