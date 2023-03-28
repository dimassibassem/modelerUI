import React from 'react'
import { Panel } from 'reactflow'
import classNames from '@/utils/classNames'
import { useTemporalStore } from '@/store'

const TopLeftPanel = () => {
  const { undo, redo, futureStates, pastStates } = useTemporalStore(
    (state) => state
  )
  return (
    <Panel className='grid grid-cols-1 gap-2' position='top-left'>
      <div className='grid grid-cols-2 items-stretch gap-2'>
        <button className={
          classNames(pastStates.length === 0 ? 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50' : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            'rounded-full  py-1 px-2.5 text-sm font-semibold  shadow-sm')
        }
                type='button'
                onClick={() => {
                  undo()
                }}
                disabled={pastStates.length === 0}>
          Undo
        </button>
        <button
          className={classNames(futureStates.length === 0 ? 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50' : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            'rounded-full  py-1 px-2.5 text-sm font-semibold  shadow-sm')} type='button'
          onClick={() => {
            redo()
          }}
          disabled={futureStates.length === 0}>
          Redo
        </button>
      </div>
    </Panel>
  )
}

export default TopLeftPanel
