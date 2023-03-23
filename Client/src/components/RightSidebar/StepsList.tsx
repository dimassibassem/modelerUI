import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { shallow } from 'zustand/shallow'
import React, { useId, useState } from 'react'
import { useFlowStore } from '../../store'
import { RFState } from '../../types/RFState'
import classNames from '../../utils/classNames'
import handleStepsChange from '../../utils/handleStepChange'

const selector = (state: RFState) => ({
  process: state.process,
  setProcess: state.setProcess,
  setNodes: state.setNodes,
  nodes: state.nodes
})

const StepsList = () => {
  const { process, setProcess, setNodes, nodes } = useFlowStore(selector, shallow)
  const [expanded, setExpanded] = useState<number[][]>([])
  const toggleExpand = (stepsArrayIndex: number, stepArrayIndex: number) => {
    const newExpanded = [...expanded]
    const index = newExpanded.findIndex(
      (item) => item[0] === stepsArrayIndex && item[1] === stepArrayIndex
    )
    if (index === -1) {
      newExpanded.push([stepsArrayIndex, stepArrayIndex])
    } else {
      newExpanded.splice(index, 1)
    }
    setExpanded(newExpanded)
  }

  const id = useId()
  return (
    <>
      {process.steps.map((steps, stepsArrayIndex) => (
        <div key={`${id + stepsArrayIndex}`}>
          <h1 className='block mt-2 text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
            Steps {stepsArrayIndex + 1}
          </h1>
          <div className='mt-2 overflow-hidden bg-white shadow sm:rounded-md'>
            <ul className='divide-y divide-gray-200'>
              {steps.map((step, stepArrayIndex) => (
                <li className='relative' key={`${id + stepsArrayIndex}${step.id}`}>
                  <button type='button'
                          onClick={() => toggleExpand(stepsArrayIndex, stepArrayIndex)}
                          className={
                            classNames(step.attributes ? 'hover:bg-gray-50 hover:cursor-pointer absolute opacity-1 w-full h-full z-2 ' : '',
                              'block')
                          }
                  />
                  <div>
                    {step.attributes ?
                      <div className='flex items-center px-4 py-4 sm:px-6'>
                        <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
                          <div className='flex text-sm'>
                            <p className='font-medium z-10 text-indigo-600'>{step.type}</p>
                          </div>
                        </div>
                        <div className='ml-5 z-10 '>
                          <div>
                            {expanded.some((item) => item[0] === stepsArrayIndex && item[1] === stepArrayIndex) ? <>
                              {Object.keys(step.attributes)
                                .map((key) =>
                                  <div key={`${step.id}_${key}`}
                                  >
                                    <div>
                                      <label htmlFor={`${step.id}_${key}`}
                                             className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
                                        {key}
                                      </label>
                                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                                        <input
                                          className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                                          type='text'
                                          name={`${step.id}_${key}`}
                                          id={`${step.id}_${key}`}
                                          value={process.steps?.[stepsArrayIndex][stepArrayIndex].attributes?.[key]}
                                          onChange={(e) => handleStepsChange(e, key, step, stepsArrayIndex, stepArrayIndex, process, setProcess, setNodes, nodes)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </> : <ChevronRightIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                            }
                          </div>
                        </div>
                      </div>
                      :
                      <div className='flex items-center px-4 py-4 sm:px-6'>
                        <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
                          <div className='flex text-sm'>
                            <p className=' font-medium text-indigo-600'>{step.type}</p>
                          </div>
                        </div>
                      </div>
                    }

                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))
      }
    </>
  )
}

export default StepsList
