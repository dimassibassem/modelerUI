import {
  ChevronRightIcon,
  ChevronUpIcon,
  ListBulletIcon
} from '@heroicons/react/20/solid'
import { shallow } from 'zustand/shallow'
import React, { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFlowStore } from '@/store'
import { RFState } from '@/types/RFState'
import classNames from '@/utils/classNames'
import {
  handleStepsChange,
  handleNodesAttributesChange
} from '@/utils/Process/handleStepChange'
import capitalize from '@/utils/capitalize'

const selector = (state: RFState) => ({
  process: state.process,
  setProcess: state.setProcess,
  setNodes: state.setNodes,
  nodes: state.nodes
})

const StepsList = () => {
  const { process, setProcess, setNodes, nodes } = useFlowStore(
    selector,
    shallow
  )
  const { t } = useTranslation()
  const [expandedAttr, setExpandedAttr] = useState<number[][]>([])
  const [expandedSteps, setExpandedSteps] = useState<number[]>([])
  const id = useId()
  const toggleExpandAttr = (
    stepsArrayIndex: number,
    stepArrayIndex: number
  ) => {
    const newExpanded = [...expandedAttr]
    const index = newExpanded.findIndex(
      (item) => item[0] === stepsArrayIndex && item[1] === stepArrayIndex
    )
    if (index === -1) {
      newExpanded.push([stepsArrayIndex, stepArrayIndex])
    } else {
      newExpanded.splice(index, 1)
    }
    setExpandedAttr(newExpanded)
  }
  const isExpandedAttr = (stepsArrayIndex: number, stepArrayIndex: number) =>
    expandedAttr.some(
      (item) => item[0] === stepsArrayIndex && item[1] === stepArrayIndex
    )

  const toggleExpandSteps = (stepsArrayIndex: number) => {
    const newExpanded = [...expandedSteps]
    const index = newExpanded.findIndex((item) => item === stepsArrayIndex)
    if (index === -1) {
      newExpanded.push(stepsArrayIndex)
    } else {
      newExpanded.splice(index, 1)
    }
    setExpandedSteps(newExpanded)
  }

  const isExpandedSteps = (stepsArrayIndex: number) =>
    expandedSteps.some((item) => item === stepsArrayIndex)
  return (
    <>
      {process.steps.map((step, stepsArrayIndex) => (
        <div key={`${id + stepsArrayIndex}`}>
          <button
            type="button"
            onClick={() => {
              toggleExpandSteps(stepsArrayIndex)
            }}
            className={classNames(
              isExpandedSteps(stepsArrayIndex)
                ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                : 'bg-gray-100 text-gray-900',
              'pl-3 text-gray-600 hover:text-gray-900 items-center p-2 my-4 text-sm font-medium rounded-md flex w-full'
            )}
          >
            {t('Steps')} {stepsArrayIndex + 1}
            <div className="ml-auto">
              {isExpandedSteps(stepsArrayIndex) ? (
                <ChevronUpIcon
                  className="h-4 w-4 hover:cursor-pointer"
                  aria-hidden="true"
                />
              ) : (
                <ListBulletIcon
                  className="h-4 w-4 hover:cursor-pointer"
                  aria-hidden="true"
                />
              )}
            </div>
          </button>

          {isExpandedSteps(stepsArrayIndex) && (
            <div className="mt-2 overflow-hidden bg-white shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {step.map((stage, stepArrayIndex) => (
                  <li
                    className="relative"
                    key={`${id + stepsArrayIndex}${stage.id}`}
                  >
                    <div>
                      <div className="flex px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 sm:flex items-center sm:justify-between">
                          <div className="flex text-sm">
                            <p className=" font-medium text-indigo-600">
                              {capitalize(t(stage.type))}
                            </p>
                          </div>
                        </div>
                        {stage.attributes ? (
                          <>
                            <div
                              className={classNames(
                                !isExpandedAttr(stepsArrayIndex, stepArrayIndex)
                                  ? 'hidden'
                                  : ''
                              )}
                            >
                              <button
                                type="button"
                                className="rounded-full mt-1 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() =>
                                  toggleExpandAttr(
                                    stepsArrayIndex,
                                    stepArrayIndex
                                  )
                                }
                              >
                                <ChevronUpIcon
                                  className="h-5 w-5 text-indigo-700 hover:text-indigo-800 hover:cursor-pointer"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                            <div
                              className={classNames(
                                isExpandedAttr(stepsArrayIndex, stepArrayIndex)
                                  ? 'hidden'
                                  : ''
                              )}
                            >
                              <button
                                type="button"
                                className="rounded-full mt-1 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() =>
                                  toggleExpandAttr(
                                    stepsArrayIndex,
                                    stepArrayIndex
                                  )
                                }
                              >
                                <ChevronRightIcon
                                  className="h-5 w-5 text-indigo-700 hover:text-indigo-800 hover:cursor-pointer"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </>
                        ) : null}
                      </div>
                      {stage.attributes ? (
                        <div className="px-4 ml-5">
                          <div>
                            {isExpandedAttr(stepsArrayIndex, stepArrayIndex) ? (
                              <>
                                {Object.keys(stage.attributes).map((key) => (
                                  <div key={`${stage.id}_${key}`}>
                                    <div>
                                      <label
                                        htmlFor={`${stage.id}_${key}`}
                                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                                      >
                                        {t(key)}
                                      </label>
                                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                                        <input
                                          className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                          type="text"
                                          name={`${stage.id}_${key}`}
                                          id={`${stage.id}_${key}`}
                                          value={
                                            process.steps?.[stepsArrayIndex][
                                              stepArrayIndex
                                            ].attributes?.[key]
                                          }
                                          onChange={(e) => {
                                            handleStepsChange(
                                              e,
                                              key,
                                              stage,
                                              stepsArrayIndex,
                                              stepArrayIndex,
                                              process,
                                              setProcess
                                            )
                                            handleNodesAttributesChange(
                                              e,
                                              key,
                                              stage,
                                              setNodes,
                                              nodes
                                            )
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <div className="pb-4" />
                              </>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default StepsList
