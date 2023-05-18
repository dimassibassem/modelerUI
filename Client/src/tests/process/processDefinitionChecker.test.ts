import { describe, it, expect, beforeEach } from 'vitest'
import processDefinitionChecker from '@/utils/Process/processDefinitionChecker'
import { nodes, edges } from '@/tests/fixtures/allNodes'
import { useFlowStore } from '@/store'

beforeEach(() => {
  useFlowStore.getState().resetState()
})

describe('processDefinitionChecker', () => {
  it('should set the process according to its valid steps', () => {
    processDefinitionChecker(
      nodes,
      edges,
      useFlowStore.getState().setProcess,
      useFlowStore.getState().process
    )

    expect(useFlowStore.getState().process).toEqual({
      ...useFlowStore.getState().process,
      steps: [
        {
          attributes: {
            channel: 'WEB',
            name: 'policy'
          },
          id: 'policies_2',
          type: 'policies'
        },
        {
          attributes: undefined,
          id: 'provisioners_3',
          type: 'provisioners'
        },
        {
          attributes: undefined,
          id: 'execution_4',
          type: 'execution'
        },
        {
          attributes: undefined,
          id: 'rule_5',
          type: 'rule'
        }
      ]
    })
  })
})
