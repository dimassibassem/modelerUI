import React from 'react'
import { useTranslation } from 'react-i18next'

const ShortcutsKeys = ({ secondKey }: { secondKey: string }) => {
  const { t } = useTranslation()
  return (
    <p className="text-gray-500">
      {t('Press')}{' '}
      <kbd className="px-2 py-1.5 text-xs font-semibold shadow-xl text-gray-800 bg-gray-300 border-2 border-b-4  border-gray-400 rounded-lg ">
        Ctrl
      </kbd>{' '}
      +{' '}
      <kbd className="px-2 py-1.5 text-xs font-semibold shadow-xl text-gray-800 bg-gray-300 border-2 border-b-4 border-gray-400 rounded-lg ">
        {secondKey}
      </kbd>{' '}
      <span className="pl-2">{t('to')}</span>
    </p>
  )
}

export default ShortcutsKeys
