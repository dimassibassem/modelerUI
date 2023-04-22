import React from 'react'
import { Panel } from 'reactflow'
import { Icon } from '@iconify/react'
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'
import classNames from '@/utils/classNames'
import { useTemporalStore } from '@/store'
import tooltipStyle from '@/style/tooltip'

const TopLeftPanel = () => {
  const { undo, redo, futureStates, pastStates } = useTemporalStore(
    (state) => state
  )
  const { t } = useTranslation()

  return (
    <Panel id="top-left" className="grid grid-cols-1 gap-2" position="top-left">
      <Tooltip id="UndoAndRedo" delayShow={600} style={tooltipStyle} />
      <div className="grid grid-cols-2 items-stretch gap-2">
        <div
          className="group flex relative"
          data-tooltip-id="UndoAndRedo"
          data-tooltip-content={t<string>('Undo')}
        >
          <button
            aria-label="Undo"
            className={classNames(
              pastStates.length === 0
                ? 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
              'rounded-full  py-1 px-2.5 text-sm font-semibold  shadow-sm'
            )}
            type="button"
            onClick={() => {
              undo()
            }}
            disabled={pastStates.length === 0}
          >
            <Icon className="w-5 h-5" icon="material-symbols:undo" />
          </button>
        </div>
        <div
          className="group flex relative"
          data-tooltip-id="UndoAndRedo"
          data-tooltip-content={t<string>('Redo')}
        >
          <button
            aria-label="Redo"
            className={classNames(
              futureStates.length === 0
                ? 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
              'rounded-full  py-1 px-2.5 text-sm font-semibold  shadow-sm'
            )}
            type="button"
            onClick={() => {
              redo()
            }}
            disabled={futureStates.length === 0}
          >
            <Icon className="w-5 h-5" icon="material-symbols:undo" hFlip />
          </button>
        </div>
      </div>
    </Panel>
  )
}

export default TopLeftPanel
