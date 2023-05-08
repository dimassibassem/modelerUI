import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'

const TopRightCommandsDefinition = ({ type }: { type: string }) => {
  const { t } = useTranslation()
  if (type === 'Clear')
    return <span className="text-gray-500 pl-2">{t('ClearContent')}</span>
  if (type === 'Save')
    return <span className="text-gray-500 pl-2">{t('SaveContent')}</span>

  return null
}

const TopRightCommandsIcons = ({ type }: { type: string }) => {
  switch (type) {
    case 'Clear':
      return <Icon className="w-5 h-5" icon="ic:outline-clear" />
    case 'Save':
      return (
        <Icon
          className="w-5 h-5"
          icon="material-symbols:save-outline-rounded"
        />
      )
    case 'Import':
      return <Icon className="w-5 h-5" icon="uil:import" />
    default:
      return null
  }
}

export { TopRightCommandsDefinition, TopRightCommandsIcons }
