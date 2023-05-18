import React from 'react'
import { Node } from 'reactflow'
import Process from '@/types/Process'
import { RFState } from '@/types/RFState'

function handleStepsChange(
  e: React.ChangeEvent<HTMLInputElement>,
  key: string,
  step: Process['steps'][number],
  stepArrayIndex: number,
  process: RFState['process'],
  setProcess: RFState['setProcess']
) {
  setProcess({
    ...process,
    steps: process.steps.map((currStep) => ({
      ...currStep,
      attributes: {
        ...currStep.attributes,
        [key]: e.target.value
      }
    }))
  })
}

const handleNodesAttributesChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  key: string,
  step: Process['steps'][number],
  setNodes: RFState['setNodes'],
  nodes: RFState['nodes']
) => {
  setNodes(
    nodes.map((node: Node) => {
      if (node.id === step.id) {
        return {
          ...node,
          data: {
            ...node.data,
            attributes: {
              ...node.data.attributes,
              [key]: e.target.value
            }
          }
        }
      }
      return node
    })
  )
}

export { handleStepsChange, handleNodesAttributesChange }
