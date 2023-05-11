import React from 'react'
import { Switch } from '@headlessui/react'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import classNames from '@/utils/classNames'
import { useFlowStore } from '@/store'
import { RFState } from '@/types/RFState'
import StepsList from '@/components/RightSidebar/ProcessProps/StepsList'
import channels from '@/constants/channels'
import Process from '@/types/Process'
import Channel from '@/types/Channel'

const selector = (state: RFState) => ({
  process: state.process,
  setProcess: state.setProcess
})

function onChangeHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setProcess: (process: Process) => void,
  process: Process
) {
  const { name } = e.target as { name: Channel }
  setProcess({
    ...process,
    hook: {
      ...process.hook,
      channels: process.hook.channels.includes(name)
        ? process.hook.channels.filter((channel) => channel !== name)
        : [...process.hook.channels, name]
    }
  })
}

const ProcessProps = () => {
  const { process, setProcess } = useFlowStore(selector, shallow)
  const { t } = useTranslation()
  return (
    <>
      <div
        className="block text-center text-md font-medium leading-6 text-gray-900 sm:pt-1.5 outline-none focus:outline-none"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setProcess({ ...process, name: e.target.innerText })}
      >
        {process.name}
      </div>

      <div
        className="block text-center text-sm font-small leading-6 text-gray-600 sm:pt-1.5 outline-none focus:outline-none"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) =>
          setProcess({ ...process, description: e.target.innerText })
        }
      >
        {process.description}
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="hook"
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          {t('Hook')}
        </label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            name="hook"
            id="hook"
            value={process.hook.name}
            onChange={(e) => {
              setProcess({
                ...process,
                hook: {
                  ...process.hook,
                  name: e.target.value
                }
              })
            }}
            className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:border-gray-200 sm:pt-5">
        <label className="text-sm font-medium text-gray-900">
          {t('Channels')}
        </label>

        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <div className="flex gap-3">
            {channels.map((canal) => (
              <div key={canal} className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id={canal}
                    aria-describedby={canal}
                    name={canal}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={(e) => onChangeHandler(e, setProcess, process)}
                    checked={process.hook.channels.some((ch) => ch === canal)}
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor={canal} className="font-medium text-gray-900">
                    {t(canal)}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-gray-200 sm:pt-2">
        <label
          htmlFor="isAsynchronous"
          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
        >
          {t('isAsync')}
        </label>
        <div className="mt-2 sm:col-span-2 ">
          <Switch
            checked={process.hook.isAsync}
            aria-label="isAsynchronous"
            onChange={() => {
              setProcess({
                ...process,
                hook: {
                  ...process.hook,
                  isAsync: !process.hook.isAsync
                }
              })
            }}
            className={classNames(
              process.hook.isAsync ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-5 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                process.hook.isAsync ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-4 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
        </div>
      </div>

      <StepsList />
    </>
  )
}

export default ProcessProps
