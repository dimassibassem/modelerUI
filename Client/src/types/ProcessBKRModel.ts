import { Edge, Node } from 'reactflow'
import Process from '@/types/Process'

export type ProcessBKRModel = {
  id: number
  processKey: string
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
