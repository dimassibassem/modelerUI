import { ReactFlowInstance } from 'reactflow'
import imageFromHTML from '@/utils/Flow/imageFromHtml'

const copyAsImage = async (
  reactFlowInstance: ReactFlowInstance | null,
  setOpenNotification: (bool: boolean) => void,
  setNotificationData: (data: { [key: string]: unknown }) => void
) => {
  const result = await imageFromHTML(reactFlowInstance)
  if (result) {
    const image = new Image()
    image.src = result.dataURI
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const context = canvas.getContext('2d')
      context?.drawImage(image, 0, 0)
      canvas.toBlob((blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob })
          navigator.clipboard.write([item])
        }
      })
      canvas.remove()
    }
    setNotificationData({
      success: true,
      message: 'Image copied to clipboard'
    })
    setOpenNotification(true)
  }
}

export default copyAsImage
