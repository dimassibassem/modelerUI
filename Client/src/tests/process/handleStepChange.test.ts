import { describe, it, vi, expect, beforeEach } from 'vitest'
import React from 'react'
import { Node } from 'reactflow'
import {
  handleStepsChange,
  handleNodesAttributesChange
} from '@/utils/Process/handleStepChange'
import { useFlowStore } from '@/store'
import Process from '@/types/Process'

beforeEach(() => {
  useFlowStore.getState().resetState()
})
describe('handleStepsChange', () => {
  it('should update the attributes of a step in the process', () => {
    const setProcess = vi.fn()
    const process = {
      steps: [
        [{ attributes: { key: 'value' } }, { attributes: { key: 'value' } }],
        [{ attributes: { key: 'value' } }, { attributes: { key: 'value' } }]
      ]
    } as unknown as Process

    const eventMock = {
      target: { value: 'updated' }
    } as React.ChangeEvent<HTMLInputElement>

    handleStepsChange(
      eventMock,
      'key',
      process.steps[0],
      0,
      useFlowStore.getState().process,
      setProcess
    )

    expect(setProcess).toHaveBeenCalledTimes(1)
  })
})

describe('handleNodesAttributesChange', () => {
  it('should update the attributes of a node in the nodes array', () => {
    const setNodesMock = vi.fn()

    const nodes = [
      { id: 'node1', data: { attributes: { key: 'value' } } },
      { id: 'node2', data: { attributes: { key: 'value' } } }
    ] as Node[]

    const eventMock = {
      target: { value: 'updated' }
    } as React.ChangeEvent<HTMLInputElement>

    const step = { id: 'node2' } as unknown as Process['steps'][number]

    handleNodesAttributesChange(eventMock, 'key', step, setNodesMock, nodes)

    expect(setNodesMock).toHaveBeenCalledTimes(1)
  })
})
