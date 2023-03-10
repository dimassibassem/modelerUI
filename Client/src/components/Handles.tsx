import { Connection, Handle, Position } from 'reactflow'

const Handles = ({
                   width,
                   handles,
                   isValidConnection
                 }: {
  isValidConnection: (connection: Connection) => boolean,
  width: number, handles: {
    position: Position,
    enable: boolean,
  }[]
}) => (
  <>
    {
      handles.map((handle) => (
        handle.enable &&
        <Handle key={handle.position}
                style={{ width: width / 15, height: width / 15 }}
                type='source' position={handle.position}
                id={handle.position}
                isValidConnection={isValidConnection}
        />
      ))}
  </>
)

export default Handles
