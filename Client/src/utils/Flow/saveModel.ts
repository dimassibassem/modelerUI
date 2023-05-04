import { ReactFlowInstance } from 'reactflow'
import axios from 'axios'
import imageFromHTML from '@/utils/Flow/imageFromHtml'
import Process from '@/types/Process'

async function saveModel(
  reactFlowInstance: ReactFlowInstance | null,
  process: Process,
  setNotificationData: (data: { success: boolean; message: string }) => void,
  modelID: number | null,
  setModelID: (id: number) => void,
  setOpenNotification: (open: boolean) => void
) {
  if (reactFlowInstance) {
    reactFlowInstance.fitView()
    const res = await imageFromHTML(reactFlowInstance)
    if (res) {
      const blob = await fetch(res.dataURI).then((r) => r.blob())
      const file = new File([blob], 'flow.png', { type: 'image/png' })
      const formData = new FormData()
      formData.append('flow', file)
      formData.append('instance', JSON.stringify(res.instance))
      formData.append('process', JSON.stringify(process))
      try {
        if (!modelID) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/api/add-model`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          setModelID(response.data.id)
          setNotificationData({
            success: true,
            message: 'Model saved successfully'
          })
          setOpenNotification(true)
        } else {
          await axios.put(
            `${import.meta.env.VITE_API_ENDPOINT}/api/update-model/${modelID}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          setNotificationData({
            success: true,
            message: 'Model updated successfully'
          })
          setOpenNotification(true)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export default saveModel
