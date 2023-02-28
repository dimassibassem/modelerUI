import { Handle, Position } from 'reactflow'

const Decision = ({ data, id }) => (
  <div className='relative bg-no-repeat bg-center bg-contain h-[70px] w-[50px]'>
    <div
      className='block absolute rotate-45 bg-[#a600ff] w-[50px] h-[50px] border z-[-1] border-solid right-auto top-2.5' />
    <Handle type='target' position={Position.Top} id=".top" />
    <Handle type='source' position={Position.Bottom} id=".bottom" />
    <Handle type='target' position={Position.Left} id=".left" style={{ left: '-18px' }} />
    <Handle type='source' position={Position.Right} id=".right" style={{ right: '-18px' }} />
  </div>
)
export default Decision
