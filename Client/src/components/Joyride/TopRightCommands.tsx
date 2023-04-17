import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'

const TopRightCommandsDefinition = ({ type }: { type: string }) => {
  const { t } = useTranslation()
  switch (type) {
    case 'Clear':
      return <span className="text-gray-500 pl-2">{t('ClearContent')}</span>
    case 'Save':
      return <span className="text-gray-500 pl-2">{t('SaveContent')}</span>
    case 'Import':
      return <span className="text-gray-500 pl-2">{t('ImportContent')}</span>
    default:
      return null
  }
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
