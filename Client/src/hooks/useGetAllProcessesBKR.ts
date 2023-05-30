import { useEffect } from 'react'
import axios from 'axios'
import { shallow } from 'zustand/shallow'
import useProcessBKRModel from '@/store/processBKRModelStore'
import { ProcessBKRState } from '@/types/store/ProcessBKRState'
import BkrData from '@/types/BkrData'

const loadProcessesBKRModel = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/process/definition`
  )
  return res.data
}
const selector = (state: ProcessBKRState) => ({
  setProcessesBKRModel: state.setProcessesBKRModel,
  processesBKRModel: state.processesBKRModel
})

const useGetAllProcessesBKR = () => {
  const { setProcessesBKRModel, processesBKRModel } = useProcessBKRModel(
    selector,
    shallow
  )
  return useEffect(() => {
    if (!processesBKRModel) {
      loadProcessesBKRModel().then((res) => {
        setProcessesBKRModel(
          res.map((data: BkrData) => ({
            id: data.id,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            processKey: data.processKey,
            processData: JSON.parse(data.processData),
            previewData: JSON.parse(data.previewData),
            image: data.image
          }))
        )
      })
    }
  }, [processesBKRModel, setProcessesBKRModel])
}

export default useGetAllProcessesBKR
