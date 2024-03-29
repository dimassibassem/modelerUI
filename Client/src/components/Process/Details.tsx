import React, { Fragment, useId, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import { ProcessBKRModel } from '@/types/ProcessBKRModel'
import capitalize from '@/utils/capitalize'
import useStore from '@/store/stateStore'
import { useFlowStore } from '@/store'
import { RFState } from '@/types/store/RFState'
import State from '@/types/store/State'
import DeleteProcess from '@/components/Modals/DeleteProcess'

const selector = (state: RFState) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setProcess: state.setProcess
})
const selector2 = (state: State) => ({
  setProcessId: state.setProcessId,
  setLastNodeIdNumber: state.setLastNodeIdNumber
})

const Details = ({
  open,
  setOpen,
  selectedProcessBKRModel
}: {
  open: boolean
  setOpen: (open: boolean) => void
  selectedProcessBKRModel: ProcessBKRModel | null
}) => {
  const navigate = useNavigate()
  const id = useId()
  const { setProcess, setNodes, setEdges } = useFlowStore(selector, shallow)
  const { setProcessId, setLastNodeIdNumber } = useStore(selector2, shallow)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <DeleteProcess
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-96">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">{t('ClosePanel')}</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-full overflow-y-auto bg-white p-8">
                      <div className="space-y-6 pb-16">
                        <div>
                          <div className="aspect-h-7 aspect-w-10 block w-full shadow overflow-hidden rounded-lg">
                            <img
                              src={selectedProcessBKRModel?.image}
                              alt=""
                              className="object-cover"
                            />
                          </div>
                          <div className="mt-4 flex items-start justify-between">
                            <h2 className="text-base font-semibold leading-6 text-gray-900">
                              <span className="sr-only">{t('DetailsFor')}</span>
                              {selectedProcessBKRModel?.processKey}
                            </h2>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {t('Information')}
                          </h3>
                          <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">{t('Created')}</dt>
                              <dd className="text-gray-900">
                                {dayjs(
                                  selectedProcessBKRModel?.createdAt
                                ).format('DD MMMM YYYY, h:mm:ss a')}
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">
                                {t('LastModified')}
                              </dt>
                              <dd className="text-gray-900">
                                {dayjs(
                                  selectedProcessBKRModel?.updatedAt
                                ).format('DD MMMM YYYY, h:mm:ss a')}
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">{t('HookName')}</dt>
                              <dd className="text-gray-900">
                                {selectedProcessBKRModel?.processData.hook.name}
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">{t('Channels')}</dt>
                              <dd className="text-gray-900">
                                {selectedProcessBKRModel?.processData.channels.map(
                                  (channel, i) => (
                                    <span key={`${id + i}`}>
                                      {capitalize(channel)}
                                      {i !==
                                        selectedProcessBKRModel.processData
                                          .channels.length -
                                          1 && ', '}
                                    </span>
                                  )
                                )}
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">{t('isAsync')}</dt>
                              <dd className="text-gray-900">
                                {selectedProcessBKRModel?.processData.hook
                                  .isAsync
                                  ? t('Yes')
                                  : t('No')}
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {t('Description')}
                          </h3>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm italic text-gray-500">
                              {selectedProcessBKRModel?.processData.description}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {t('Stages')}
                          </h3>
                          {selectedProcessBKRModel?.processData.steps.map(
                            (step, i) => (
                              <div key={`${id + i}`} className="mt-2">
                                <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                  <div key={step.id}>
                                    <dt className="font-medium">
                                      {t(step.type)}
                                    </dt>
                                    <div>
                                      {Object.keys(step.attributes).map(
                                        (key) => (
                                          <div
                                            key={step.id + key}
                                            className="flex justify-between py-3 text-sm font-medium"
                                          >
                                            <dt className="text-gray-500">
                                              {capitalize(t(key))}
                                            </dt>
                                            <dd className="text-gray-900">
                                              {step.attributes?.[key] || 'N/A'}
                                            </dd>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </dl>
                              </div>
                            )
                          )}
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => {
                              if (selectedProcessBKRModel) {
                                setProcessId(selectedProcessBKRModel.id)
                                setLastNodeIdNumber(
                                  selectedProcessBKRModel.previewData.nodes
                                    .length
                                )
                                setNodes(
                                  selectedProcessBKRModel.previewData.nodes
                                )
                                setEdges(
                                  selectedProcessBKRModel.previewData.edges
                                )
                                setProcess(selectedProcessBKRModel.processData)
                                navigate(
                                  `/modeler/${selectedProcessBKRModel.id}`
                                )
                              }
                            }}
                          >
                            {t('Edit')}
                          </button>
                          <button
                            type="button"
                            className="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => {
                              setOpenDeleteModal(true)
                              setOpen(false)
                            }}
                          >
                            {t('Delete')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Details
