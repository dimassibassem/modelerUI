import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { shallow } from 'zustand/shallow'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'
import State from '@/types/State'
import useStore from '@/store/stateStore'
import useHandleNotification from '@/hooks/useHandleNotification'

const loadModel = async (id: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/process/definition/${id}`
  )
  return res.data
}
const selector = (state: RFState) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setProcess: state.setProcess
})
const selector2 = (state: State) => ({
  setProcessId: state.setProcessId,
  setLastNodeIdNumber: state.setLastNodeIdNumber
})
const useLoadModel = (setLoaded: (loaded: boolean) => void) => {
  const { id } = useParams<{ id: string }>()
  const { setProcess, setNodes, setEdges } = useFlowStore(selector, shallow)
  const handleNotif = useHandleNotification()
  const { setProcessId, setLastNodeIdNumber } = useStore(selector2, shallow)
  const navigate = useNavigate()
  return useEffect(() => {
    if (id) {
      loadModel(id)
        .then((data) => {
          setProcessId(data.id)
          setLastNodeIdNumber(JSON.parse(data.previewData).nodes.length)
          setNodes(JSON.parse(data.previewData).nodes)
          setEdges(JSON.parse(data.previewData).edges)
          setProcess(JSON.parse(data.processData))
        })
        .catch((err) => {
          handleNotif({
            success: false,
            message: err.message
          })
          navigate('/modeler')
        })
        .finally(() => {
          setLoaded(true)
        })
    } else {
      setLoaded(true)
    }
  }, [
    id,
    navigate,
    setEdges,
    setLastNodeIdNumber,
    setLoaded,
    setProcessId,
    setNodes,
    setProcess
  ])
}

export default useLoadModel
