import { ItemParams } from 'react-contexify'
import { MouseEvent } from 'react'
import { ReactFlowInstance } from 'reactflow'
import imageFromHTML from './imageFromHtml'

export const handleItemClick = async ({
                                        id,
                                        event,
                                        props
                                      }: ItemParams) => {
  switch (id) {
    case 'copy':
      console.log(event, props)
      break
    case 'cut':
      console.log(event, props)
      break
    case 'copyAsImage': {
      const result = await imageFromHTML(props.reactFlowInstance)
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
                const item = new ClipboardItem({ "image/png": blob });
                navigator.clipboard.write([item]);
              }}
          )
          canvas.remove()
        }
        props.setOpenNotification(true)
      }
    }
      break
    default:
  }
}

export const handleContextMenu = (event: MouseEvent,
                                  reactFlowInstance: ReactFlowInstance | null,
                                  show: (params: {
                                    event: MouseEvent, props: { [key: string]: any }
                                  }) => void,
                                  copy: (text: string) => Promise<boolean>,
                                  setOpenNotification: (open: boolean) => void,
) => {
  show({
    event,
    props: {
      key: 'value',
      reactFlowInstance,
      copy,
      setOpenNotification
    }
  })
}
