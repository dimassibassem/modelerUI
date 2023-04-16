import { Edge, Node } from 'reactflow'
import { describe, it, expect } from 'vitest'
import NodeType from '@/types/NodeType'
import processDefinitionChecker from '@/utils/Process/processDefinitionChecker'
import Process from '@/types/Process'

let process: Process = {
  steps: [],
  name: '',
  description: '',
  hook: { name: '', channel: '', isAsync: false }
}
const setProcess = (proc: Process) => {
  process = proc
}
describe('processDefinitionChecker', () => {
  it('should set the process according to its valid steps', () => {
    const nodes: Node[] = [
      {
        id: 'start_0',
        type: NodeType.Start,
        data: {},
        position: { x: 0, y: 0 }
      },
      {
        id: 'end_1',
        type: NodeType.End,
        data: {},
        position: { x: 200, y: 200 }
      }
    ]
    const edges: Edge[] = [
      {
        id: 'e1',
        source: 'start_0',
        target: 'end_1'
      }
    ]

    processDefinitionChecker(nodes, edges, setProcess, process)

    expect(process).toEqual({
      ...process,
      steps: [
        [
          { id: 'start_0', type: 'start' },
          { id: 'end_1', type: 'end' }
        ]
      ]
    })
  })
})
