import {ChevronRightIcon } from '@heroicons/react/20/solid'
import { shallow } from 'zustand/shallow'
import React, { useId, useState } from 'react'
import { Node } from 'reactflow'
import { useFlowStore } from '../../store'
import { RFState } from '../../types/RFState'
import classNames from '../../utils/classNames'

const selector = (state: RFState) => ({
  process: state.process,
  setProcess: state.setProcess,
  setNodes: state.setNodes,
  nodes: state.nodes
})
const StepsList = () => {
  const { process, setProcess, setNodes, nodes } = useFlowStore(selector, shallow)
  const [expanded, setExpanded] = useState<number[]>([])
  const toggleExpand = (index: number) => {
    if (expanded.includes(index)) {
      setExpanded(expanded.filter((i) => i !== index))
    } else {
      setExpanded([...expanded, index])
    }
  }
  const id = useId()
// todo : steps must hide when invalid path
  return (
    <>
      {process.steps.map((steps, stepsArrayIndex) => (
        <div key={`${id}_${stepsArrayIndex}`} className='mt-2 overflow-hidden bg-white shadow sm:rounded-md'>
          <ul role='list' className='divide-y divide-gray-200'>
            {steps.map((step, stepArrayIndex) => (
              <li key={step.id} onClick={() => {
                if (step.attributes) toggleExpand(stepArrayIndex)
              }}>
                <div className={
                  classNames(step.attributes ? 'hover:bg-gray-50 hover:cursor-pointer' : '',
                    'block')
                }>
                  <div className='flex items-center px-4 py-4 sm:px-6'>
                    <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
                      <div className='flex text-sm'>
                        <p className=' font-medium text-indigo-600'>{step.type}</p>
                      </div>
                    </div>
                    <div className='ml-5 '>
                      {step.attributes && <div>
                        {!expanded.includes(stepArrayIndex) ?
                          <ChevronRightIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                          : <>
                            {Object.keys(step.attributes)
                              .map((key, attIndex) => <div key={`${key}_${attIndex}_${id}`}>
                                  <div>
                                    <label htmlFor={`${stepsArrayIndex}_${stepArrayIndex}_${key}`}
                                           className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
                                      {key}
                                    </label>
                                    <div className='mt-2 sm:col-span-2 sm:mt-0'>
                                      <input
                                        className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                                        type='text'
                                        name={`${stepsArrayIndex}_${stepArrayIndex}_${key}`}
                                        id={`${stepsArrayIndex}_${stepArrayIndex}_${key}`}
                                        value={process.steps[stepsArrayIndex][stepArrayIndex].attributes[key]}
                                        onChange={(e) => {
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
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                          </>
                        }
                      </div>
                      }
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))
      }
    </>
  )
}

export default StepsList
