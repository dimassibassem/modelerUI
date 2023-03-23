import React from 'react'
import { RadioGroup, Switch } from '@headlessui/react'
import { shallow } from 'zustand/shallow'
import classNames from '../../utils/classNames'
import { useFlowStore } from '../../store'
import { RFState } from '../../types/RFState'
import StepsList from './StepsList'

const Channels = ['MOB', 'WEB']
const selector = (state: RFState) => ({
  process: state.process,
  setProcess: state.setProcess
})
const SidebarProps = () => {
  const { process, setProcess } = useFlowStore(selector, shallow)
  return (
    <>
      <div
        className='flex flex-nowrap justify-center block text-md font-medium leading-6 text-gray-900 sm:pt-1.5 items-center truncate outline-none focus:outline-none'
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          setProcess({ ...process, name: e.target.innerText })
        }}
    >
        {process.name}
      </div>

      <div
        className='flex flex-nowrap justify-center block text-sm font-small leading-6 text-gray-600 sm:pt-1.5 items-center truncate outline-none focus:outline-none'
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          setProcess({ ...process, description: e.target.innerText })
        }}
    >
        {process.description}
      </div>



      <div
        className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:border-gray-200 sm:pt-5'>
        <label htmlFor='hook'
               className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
          Hook
        </label>
        <div className='mt-2 sm:col-span-2 sm:mt-0'>
          <input
            type='text'
            name='hook'
            id='hook'
            value={process.hook.name}
            onChange={(e) => {
              setProcess(
                {
                  ...process,
                  hook: {
                    ...process.hook,
                    name: e.target.value
                  }
                }
              )
            }}
            className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div
        className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-gray-200 sm:pt-2'>
        <label htmlFor='channel'
               className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
          Channel
        </label>
        <div className='mt-2 sm:col-span-2 sm:mt-0'>
          <RadioGroup value={process.hook.channel} onChange={(ch) => {
            setProcess(
              {
                ...process,
                hook: {
                  ...process.hook,
                  channel: ch
                }
              }
            )
          }}>
            <div className='grid grid-cols-2 gap-3 '>
              {Channels.map((canal) => (
                <RadioGroup.Option
                  key={canal}
                  value={canal}
                  className={({ active, checked }) =>
                    classNames(
                      active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                      checked
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                        : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                      'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none'
                    )
                  }
                >
                  <RadioGroup.Label as='span'>{canal}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>

      <div
        className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-gray-200 sm:pt-2'>
        <label htmlFor='isAsynchronous'
               className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
          isAsync
        </label>
        <div className='mt-2 sm:col-span-2 '>
          <Switch
            checked={process.hook.isAsync}
            onChange={() => {
              setProcess(
                {
                  ...process,
                  hook: {
                    ...process.hook,
                    isAsync: !process.hook.isAsync
                  }
                }
              )
            }}
            className={classNames(
              process.hook.isAsync ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-5 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
            )}
          >
                          <span
                            aria-hidden='true'
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

export default SidebarProps
