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
    case 'Chain Recovery':
      return (
        <span className="text-gray-500 pl-2">{t('ChainRecoveryContent')}</span>
      )
    default:
      return null
  }
}

const TopRightCommandsIcons = ({ type }: { type: string }) => {
  switch (type) {
    case 'Clear':
      return <Icon className="w-5 h-5" icon="fa-regular:trash-alt" />
    case 'Save':
      return <Icon className="w-5 h-5" icon="fa-regular:save" />
    case 'Chain Recovery':
      return <Icon className="w-5 h-5" icon="fa:chain" />
    default:
      return null
  }
}

export { TopRightCommandsDefinition, TopRightCommandsIcons }
