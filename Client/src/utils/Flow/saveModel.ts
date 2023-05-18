import { ReactFlowInstance } from 'reactflow'
import axios from 'axios'
import imageFromHTML from '@/utils/Flow/imageFromHtml'
import Process from '@/types/Process'
import { NotificationData } from '@/types/State'

async function saveModel(
  reactFlowInstance: ReactFlowInstance | null,
  process: Process,
  modelID: string | null,
  setModelID: (id: string) => void,
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
        // if (!modelID) {

        await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/process/definition`,
          // formData,
          {
            processKey: process.processKey,
            processData: JSON.stringify(process),
            previewData: JSON.stringify(res.instance),
            image: res.dataURI
          }
          // {
          // headers: {
          //   'Content-Type': 'multipart/form-data'
          // }
          // }
        )
        // setModelID(response.data.id)
        handleNotif({
          success: true,
          message: 'Model saved successfully'
        })

        // }
        // else {
        //   await axios.put(
        //     `${import.meta.env.VITE_API_ENDPOINT}/api/update-model/${modelID}`,
        //     formData,
        //     {
        //       headers: {
        //         'Content-Type': 'multipart/form-data'
        //       }
        //     }
        //   )
        //   setNotificationData({
        //     success: true,
        //     message: 'Model updated successfully'
        //   })
        //   setOpenNotification(true)
        // }
      } catch (e) {
        handleNotif({
          success: false,
          message: 'Error saving model'
        })
      }
    }
  }
}
export default saveModel
