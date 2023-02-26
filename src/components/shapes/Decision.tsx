import { Handle, Position } from 'reactflow'
import './DecisionNode.css'

const Decision = ({ data, id }) => (
    <div className='handles-container-decision'>
      <div className='rhombusNode' />
      <Handle type='target' position={Position.Top} id={`${id}.top`} />
      <Handle type='source' position={Position.Bottom} id={`${id}.bottom`} />
      <Handle type='target' position={Position.Left} id={`${id}.left`} style={{ left: '-18px' }} />
      <Handle type='source' position={Position.Right} id={`${id}.right`} style={{ right: '-18px' }} />
    </div>
  )
export default Decision
