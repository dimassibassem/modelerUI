import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import { RFState } from '@/types/store/RFState'
import { useFlowStore, useTemporalStore } from '@/store'
import Process from '@/types/Process'
import State from '@/types/store/State'
import useStore from '@/store/stateStore'

const selector = (state: RFState) => ({
  setProcess: state.setProcess,
  process: state.process
})

const selector2 = (state: State) => ({
  setProcessDefOpenModal: state.setProcessDefOpenModal,
  processDefOpenModal: state.processDefOpenModal
})

function handleSubmit(
  processKey: string,
  description: string,
  setOpen: (arg0: boolean) => void,
  setProcess: (arg0: Process) => void,
  process: Process,
  pause: () => void,
  resume: () => void
) {
  if (processKey === '' || description === '') {
    alert('Please fill all fields')
  } else {
    pause()
    setProcess({
      ...process,
      processKey,
      description
    })
    setOpen(false)
    resume()
  }
}

const ProcessDefinitionModal = () => {
  const { setProcess, process } = useFlowStore(selector, shallow)
  const { setProcessDefOpenModal, processDefOpenModal } = useStore(
    selector2,
    shallow
  )
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const { pause, resume } = useTemporalStore((state) => state)
  const { t } = useTranslation()
  return (
    <Transition.Root show={processDefOpenModal}>
      <div className="relative z-10">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                id="process-modal"
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
              >
                <div className="mt-3 text-center sm:mt-3 sm:pb-3">
                  <h3 className="mb-3 text-base font-semibold leading-6 text-gray-900">
                    {t('ProcessDefinition')}
                  </h3>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        {t('processKey')}
                      </label>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <input
                          required
                          type="text"
                          name="name"
                          id="name"
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Description
                      </label>

                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <textarea
                          required
                          rows={2}
                          name="description"
                          id="description"
                          onChange={(e) => setDescription(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={() =>
                      handleSubmit(
                        name,
                        description,
                        setProcessDefOpenModal,
                        setProcess,
                        process,
                        pause,
                        resume
                      )
                    }
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  >
                    {t('StartCreating')}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition.Root>
  )
}
export default ProcessDefinitionModal
