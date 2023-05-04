import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useLocalStorage from '@/store/localStorage'
import dayjs from 'dayjs'

const useHandleLangChange = () => {
  const { i18n } = useTranslation()
  const lang = useLocalStorage((store) => store.lang)
  return useEffect(() => {
    i18n.changeLanguage(lang)
    dayjs.locale(lang)
  }, [i18n, lang])
}

export default useHandleLangChange
