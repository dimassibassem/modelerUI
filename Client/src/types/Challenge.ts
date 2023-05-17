import { Edge, Node } from 'reactflow'
import Process from '@/types/Process'

export type Challenge = {
  id: number
  processKey: string
  fileName: string
  createdAt: string
  updatedAt: string
  image: string
  previewData: {
    nodes: Node[]
    edges: Edge[]
    viewport: {
      x: number
      y: number
      zoom: number
    }
  }
  processData: Process
}
