import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import useLocalStorage from '@/store/localStorage'
import useHandleNotification from '@/hooks/useHandleNotification'

const useHandleLangChange = () => {
  const { i18n } = useTranslation()

  const lang = useLocalStorage((store) => store.lang)
  const handleNotif = useHandleNotification()
  return useEffect(() => {
    i18n.changeLanguage(lang).catch(() => {
      handleNotif({
        success: false,
        message: 'Error changing language'
      })
    })
    dayjs.locale(lang)
  }, [i18n, lang])
}

export default useHandleLangChange
