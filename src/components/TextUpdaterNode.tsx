import { ChangeEvent, useCallback } from 'react'
import { Handle, Position } from 'reactflow'

const handleStyle = { left: 10 }

const TextUpdaterNode = ({ data }: any) => {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>
  ) => {
    data.text = evt.target.value
  }, [data])
  return (
    <div className='text-updater-node'>
      <Handle type='target' position={Position.Top} />
      <div>
        <label htmlFor={data.label}>Text:</label>
        <input id={data.label} name={data.label} onChange={onChange} />
      </div>
      <Handle type='source' position={Position.Bottom} id='a' style={handleStyle} />
      <Handle type='source' position={Position.Bottom} id='b' />
    </div>
  )
}

export default TextUpdaterNode
