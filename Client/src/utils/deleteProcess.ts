import axios from 'axios'
import { ProcessBKRModel } from '@/types/ProcessBKRModel'

async function deleteProcess(
  id: number | undefined,
  processesBKRModel: ProcessBKRModel[] | null,
  setProcessesBKRModel: (processesBKRModel: ProcessBKRModel[]) => void
) {
  if (id) {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/process/definition/${id}`
    )
    if (res.status === 200) {
      const newProcessesBKRModel = processesBKRModel?.filter(
        (process) => process.id !== id
      )
      if (newProcessesBKRModel) {
        setProcessesBKRModel(newProcessesBKRModel)
      }
    }
  }
}

export default deleteProcess
