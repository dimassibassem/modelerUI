import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useLocalStorage from '@/store/localStorage'

const useHandleLangChange = () => {
  const { i18n } = useTranslation()
  const lang = useLocalStorage((store) => store.lang)
  return useEffect(() => {
    i18n.changeLanguage(lang)
  }, [i18n, lang])
}

export default useHandleLangChange
