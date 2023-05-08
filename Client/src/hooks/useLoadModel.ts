import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { shallow } from 'zustand/shallow'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'
import State from '@/types/State'
import useStore from '@/store/stateStore'

const loadModel = async (id: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/api/get-model/${id}`
  )
  return res.data
}
const selector = (state: RFState) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setProcess: state.setProcess
})
const selector2 = (state: State) => ({
  setModelID: state.setModelID,
  setLastNodeIdNumber: state.setLastNodeIdNumber
})
const useLoadModel = (setLoaded: (loaded: boolean) => void) => {
  const { id } = useParams<{ id: string }>()
  const { setProcess, setNodes, setEdges } = useFlowStore(selector, shallow)
  const { setModelID, setLastNodeIdNumber } = useStore(selector2, shallow)
  const navigate = useNavigate()
  return useEffect(() => {
    if (id) {
      loadModel(id)
        .then((data) => {
          setModelID(Number(id))
          setLastNodeIdNumber(data.instance.nodes.length)
          setNodes(data.instance.nodes)
          setEdges(data.instance.edges)
          setProcess(data.process)
        })
        .catch((err) => {
          console.error(err)
          navigate('/modeler')
        })
    }
    setLoaded(true)
  }, [id, navigate, setEdges, setLastNodeIdNumber, setLoaded, setModelID, setNodes, setProcess])
}

export default useLoadModel
