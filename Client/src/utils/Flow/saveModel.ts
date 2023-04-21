import { ReactFlowInstance } from 'reactflow'
import imageFromHTML from '@/utils/Flow/imageFromHtml'
import axios from 'axios'
import Process from '@/types/Process'

async function saveModel(
  reactFlowInstance: ReactFlowInstance | null,
  process: Process,
  setNotificationData: (data: {
    success: boolean,
    message: string
  }) => void,
  setOpenNotification: (open: boolean) => void) {
  const res = await imageFromHTML(reactFlowInstance)
  if (res) {
    const blob = await fetch(res.dataURI).then((r) => r.blob())
    const file = new File([blob], 'flow.png', { type: 'image/png' })
    const result = new FormData()
    result.append('flow', file)
    result.append('instance', JSON.stringify(res.instance))
    result.append('process', JSON.stringify(process))
    try {
      await axios.post(import.meta.env.VITE_API_ENDPOINT + '/api/add-model', result, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setNotificationData({
        success: true,
        message: 'Model saved successfully'
      })
      setOpenNotification(true)
    } catch (e) {
      console.log(e)
    }
  }
}


export default saveModel
