import { ReactFlowInstance } from 'reactflow'
import { toPng } from 'html-to-image'

const imageFromHTML = async (reactFlowInstance: ReactFlowInstance | null) => {
  if (reactFlowInstance) {
    const reactFlow = document.querySelector('.react-flow') as HTMLElement
    const dataURI = await toPng(reactFlow, {
      filter: (node) =>
        // we don't want to add the minimap, the controls and the panel to the image
        !(
          node?.classList?.contains('react-flow__minimap') ||
          node?.classList?.contains('react-flow__controls') ||
          node?.classList?.contains('react-flow__panel')
        )
    })
    const instance = reactFlowInstance.toObject()
    return { dataURI, instance }
  }
  return null
}

export default imageFromHTML
