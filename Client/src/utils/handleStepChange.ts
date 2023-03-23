import React from 'react'
import { Node } from 'reactflow'
import Process from '../types/Process'
import { RFState } from '../types/RFState'

function handleStepsChange(e: React.ChangeEvent<HTMLInputElement>,
                           key: string,
                           step: Process['steps'][number][number],
                           stepsArrayIndex: number,
                           stepArrayIndex: number,
                           process: RFState['process'],
                           setProcess: RFState['setProcess'],
                           setNodes: RFState['setNodes'],
                           nodes: RFState['nodes']
) {
  setProcess({
      ...process,
      steps: process.steps.map((stepsArray, index) => {
        if (index === stepsArrayIndex) {
          return stepsArray.map((currStep, stepInd) => {
            if (stepInd === stepArrayIndex) {
              return {
                ...currStep,
                attributes: {
                  ...currStep.attributes,
                  [key]: e.target.value
                }
              }
            }
            return currStep
          })
        }
        return stepsArray
      })
    }
  )
  setNodes(nodes.map((node: Node) => {
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
    }
  ))
}

export default handleStepsChange
