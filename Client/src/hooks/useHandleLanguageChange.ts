import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import useLocalStorage from '@/store/localStorage'

const useHandleLangChange = () => {
  const { i18n } = useTranslation()
  const lang = useLocalStorage((store) => store.lang)
  return useEffect(() => {
    i18n.changeLanguage(lang).catch((err) => {
      console.error(err)
    })
    dayjs.locale(lang)
  }, [i18n, lang])
}

export default useHandleLangChange
