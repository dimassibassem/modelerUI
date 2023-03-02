import { Handle, Position } from 'reactflow'

const handleStyle = { left: 10 }

const Oval = ({ data }) => (
    <div className=''>
      <div className='w-[100px] h-[50px] rounded-[100px_/_50px] bg-amber-500 ' />
      <Handle type='target' position={Position.Left} />
      <div>
        {/* <label htmlFor="text">Text:</label> */}
        {/* <input id="text" name="text" onChange={onChange} /> */}
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} /> */}
      <Handle type='source' position={Position.Right} id='b' />
    </div>
  )

export default Oval
