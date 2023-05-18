import React from 'react'
import { useTranslation } from 'react-i18next'
import { shallow } from 'zustand/shallow'
import channels from '@/constants/channels'
import Process from '@/types/Process'
import Channel from '@/types/Channel'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

function onChangeHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setProcess: (process: Process) => void,
  process: Process
) {
  const { name } = e.target as { name: Channel }
  setProcess({
    ...process,
    channels: process.channels.includes(name)
      ? process.channels.filter((channel) => channel !== name)
      : [...process.channels, name]
  })
}

const selector = (state: RFState) => ({
  process: state.process,
  setProcess: state.setProcess
})

const ChannelsRadio = () => {
  const { process, setProcess } = useFlowStore(selector, shallow)
  const { t } = useTranslation()
  return (
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
                checked={process.channels.some((ch) => ch === canal)}
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
  )
}

export default ChannelsRadio
