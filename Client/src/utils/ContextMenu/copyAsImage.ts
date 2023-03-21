import { ReactFlowInstance } from 'reactflow'
import imageFromHTML from '../imageFromHtml'

const copyAsImage = async (reactFlowInstance: ReactFlowInstance | null, setOpenNotification: (bool: boolean) => void) => {
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
        }
      )
      canvas.remove()
    }
    setOpenNotification(true)
  }
}

export default copyAsImage
