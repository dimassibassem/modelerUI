import { Dispatch, SetStateAction, useCallback } from 'react'
import { addEdge, Connection, Edge } from 'reactflow'

function useOnConnectEdge(setEdgesArray: Dispatch<SetStateAction<Edge[]>>) {
  return useCallback((connection: Connection) => setEdgesArray((eds) => addEdge(connection, eds)), [setEdgesArray])
}

export default useOnConnectEdge
