import { Edge, Node } from 'reactflow'
import Process from '@/types/Process'

export type Model = {
  id: number,
  fileName: string
  createdAt: string
  updatedAt: string
  instance: {
    nodes: Node[]
    edges: Edge[]
    viewport: {
      x: number
      y: number
      zoom: number
    }
  }
  process: Process
}
