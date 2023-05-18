import {
  ChevronRightIcon,
  ChevronUpIcon,
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
import channels from '@/constants/channels'

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

  return (
    <div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="steps"
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          {t('Steps')}
        </label>
      </div>

      <div className="mt-2 overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {process.steps.map((stage, stepArrayIndex) => (
            <li className="relative" key={`${id + stepArrayIndex}`}>
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
                          !isExpandedAttr(0, stepArrayIndex) ? 'hidden' : ''
                        )}
                      >
                        <button
                          type="button"
                          className="rounded-full mt-1 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => toggleExpandAttr(0, stepArrayIndex)}
                        >
                          <ChevronUpIcon
                            className="h-5 w-5 text-indigo-700 hover:text-indigo-800 hover:cursor-pointer"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div
                        className={classNames(
                          isExpandedAttr(0, stepArrayIndex) ? 'hidden' : ''
                        )}
                      >
                        <button
                          type="button"
                          className="rounded-full mt-1 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => toggleExpandAttr(0, stepArrayIndex)}
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
                      {isExpandedAttr(0, stepArrayIndex) ? (
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
                                  {key !== 'channel' ? (
                                    <input
                                      className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                      type="text"
                                      name={`${stage.id}_${key}`}
                                      id={`${stage.id}_${key}`}
                                      value={
                                        process.steps?.[stepArrayIndex]
                                          .attributes?.[key]
                                      }
                                      onChange={(e) => {
                                        handleStepsChange(
                                          e,
                                          key,
                                          stage,
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
                                  ) : (
                                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                                      <div className="flex gap-3">
                                        {channels.map((canal) => (
                                          <div
                                            key={canal}
                                            className="relative flex items-start"
                                          >
                                            <div className="flex h-6 items-center">
                                              <input
                                                id={canal}
                                                aria-describedby={canal}
                                                name="channel"
                                                type="radio"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                value={canal}
                                                checked={
                                                  process.steps?.[
                                                    stepArrayIndex
                                                  ].attributes?.channel ===
                                                  canal
                                                }
                                                onChange={(e) => {
                                                  handleStepsChange(
                                                    e,
                                                    key,
                                                    stage,
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
                                            <div className="ml-3 text-sm leading-6">
                                              <label
                                                htmlFor={canal}
                                                className="font-medium text-gray-900"
                                              >
                                                {t(canal)}
                                              </label>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
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
    </div>
  )
}

export default StepsList
