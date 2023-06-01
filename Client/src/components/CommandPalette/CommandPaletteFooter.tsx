import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from '@/utils/classNames'

const CommandPaletteFooter = ({
  rawQuery,
  setRawQuery
}: {
  rawQuery: string
  setRawQuery: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700">
      {t('Type')}
      <button type="button" onClick={() => setRawQuery('#')}>
        <kbd
          className={classNames(
            'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
            rawQuery.startsWith('#')
              ? 'border-indigo-600 text-indigo-600'
              : 'border-gray-400 text-gray-900'
          )}
        >
          #
        </kbd>{' '}
      </button>
      <span className="inline">{t('to access Processes,')}</span>
      <button type="button" onClick={() => setRawQuery('>')}>
        <kbd
          className={classNames(
            'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
            rawQuery.startsWith('>')
              ? 'border-indigo-600 text-indigo-600'
              : 'border-gray-400 text-gray-900'
          )}
        >
          &gt;
        </kbd>{' '}
      </button>
      {t('executingCommands')}
      <button type="button" onClick={() => setRawQuery('?')}>
        <kbd
          className={classNames(
            'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
            rawQuery === '?'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-gray-400 text-gray-900'
          )}
        >
          ?
        </kbd>{' '}
      </button>
      {t('generalHelp')}
    </div>
  )
}

export default CommandPaletteFooter
