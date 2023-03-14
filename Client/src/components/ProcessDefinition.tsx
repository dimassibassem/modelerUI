import React, { useState } from 'react'
import { Transition, Switch, RadioGroup } from '@headlessui/react'
import { shallow } from 'zustand/shallow'
import classNames from '../utils/classNames'
import { RFState } from '../types/RFState'
import useStore from '../store'

const Channels = ['MOB', 'WEB']
const selector = (state: RFState) => ({
  setProcess: state.setProcess,
  process: state.process
})


const ProcessDefinition = ({ open, setOpen }: { open: boolean, setOpen: (arg0: boolean) => void }) => {
  const { setProcess, process } = useStore(selector, shallow)
  const [state, setState] = useState({
    name: '',
    description: '',
    hook: '',
    channel: 'MOB',
    isAsync: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Transition.Root show={open}>
      <div className='relative z-10'>
        <Transition.Child
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div
                className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div className='mt-3 text-center sm:mt-3 sm:pb-3'>
                  <h3 className='mb-3 text-base font-semibold leading-6 text-gray-900'>
                    Process Definition</h3>
                  <div className='space-y-6 sm:space-y-5'>
                    <div
                      className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                      <label htmlFor='name'
                             className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
                        Name
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <input
                          type='text'
                          name='name'
                          id='name'
                          onChange={handleChange}
                          className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div
                      className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                      <label htmlFor='description'
                             className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
                        Description
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <input
                          type='text'
                          name='description'
                          id='description'
                          onChange={handleChange}
                          className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div
                      className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                      <label htmlFor='hook'
                             className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
                        Hook
                      </label>
                      <div className='mt-2 sm:col-span-2 sm:mt-0'>
                        <input
                          type='text'
                          name='hook'
                          id='hook'
                          onChange={handleChange}
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
                        <RadioGroup value={state.channel} onChange={(ch) => {
                          setState({ ...state, channel: ch })
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
                          checked={state.isAsync}
                          onChange={() => setState({ ...state, isAsync: !state.isAsync })}
                          className={classNames(
                            state.isAsync ? 'bg-indigo-600' : 'bg-gray-200',
                            'relative inline-flex h-5 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                          )}
                        >
                          <span
                            aria-hidden='true'
                            className={classNames(
                              state.isAsync ? 'translate-x-5' : 'translate-x-0',
                              'pointer-events-none inline-block h-4 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                            )}
                          />
                        </Switch>
                      </div>
                    </div>

                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm'
                    onClick={() => {
                      if (state.name !== '' && state.description !== '' && state.hook !== '' && state.channel !== '') {
                        setProcess(
                          {
                            steps: process.steps,
                            name: state.name,
                            description: state.description,
                            hook: {
                              name: state.hook,
                              channel: state.channel,
                              isAsync: state.isAsync
                            }
                          })
                        setOpen(false)
                      } else {
                        alert('Please fill all the fields')
                      }
                    }}
                  >
                    Start creating your process
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
export default ProcessDefinition
