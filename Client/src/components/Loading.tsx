import React from 'react'
import { useTranslation } from 'react-i18next'

const Loading = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="/bankerise.png"
        alt="Bankerise"
        className="w-30 h-30 animate-custom-spin"
      />
      <h1 className="text-2xl font-bold text-gray-700 animate-pulse ">
        {t('Loading')}...
      </h1>
    </div>
  )
}

export default Loading
