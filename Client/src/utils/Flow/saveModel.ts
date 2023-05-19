import { ReactFlowInstance } from 'reactflow'
import axios from 'axios'
import imageFromHTML from '@/utils/Flow/imageFromHtml'
import Process from '@/types/Process'
import { NotificationData } from '@/types/State'

async function saveModel(
  reactFlowInstance: ReactFlowInstance | null,
  process: Process,
  processId: number | null,
  setProcessId: (id: number) => void,
  handleNotif: (notificationData: NotificationData) => void
) {
  if (reactFlowInstance) {
    reactFlowInstance.fitView()
    const res = await imageFromHTML(reactFlowInstance)
    process.steps.forEach((step) => {
      step.type = step.type.toUpperCase()
    })
    if (res) {
      try {
        if (!processId) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/process/definition`,
            {
              processKey: process.processKey,
              processData: JSON.stringify(process),
              previewData: JSON.stringify(res.instance),
              image: res.dataURI
            }
          )
          setProcessId(response.data.id)
          handleNotif({
            success: true,
            message: 'Model saved successfully'
          })
        } else {
          await axios.put(
            `${import.meta.env.VITE_API_ENDPOINT}/process/definition`,
            {
              id: processId,
              processKey: process.processKey,
              processData: JSON.stringify(process),
              previewData: JSON.stringify(res.instance),
              image: res.dataURI
            }
          )
          handleNotif({
            success: true,
            message: 'Model updated successfully'
          })
        }
      } catch (e) {
        console.log(e)
        handleNotif({
          success: false,
          message: 'Error saving model'
        })
      }
    }
  }
}

export default saveModel
