import { Handle, Position } from 'reactflow'

const Handles = ({
  width,
  handles
}: {
  width: number
  handles: Record<string, boolean>
}) => (
  <>
    {Object.keys(handles).map((pos) =>
      handles[pos] ? (
        <Handle
          key={pos}
          style={{ width: width / 10, height: width / 10 }}
          type="source"
          position={pos as Position}
          id={pos}
        />
      ) : null
    )}
  </>
)

export default Handles
