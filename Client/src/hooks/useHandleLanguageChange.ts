import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { shallow } from 'zustand/shallow'
import useLocalStorage from '@/store/localStorage'
import State from '@/types/State'
import useStore from '@/store/stateStore'

const selector = (state: State) => ({
  setNotificationData: state.setNotificationData,
  setOpenNotification: state.setOpenNotification
})

const useHandleLangChange = () => {
  const { i18n } = useTranslation()
  const { setNotificationData, setOpenNotification } = useStore(
    selector,
    shallow
  )
  const lang = useLocalStorage((store) => store.lang)
  return useEffect(() => {
    i18n.changeLanguage(lang).catch(() => {
      setNotificationData({
        success: false,
        message: 'Error changing language'
      })
      setOpenNotification(true)
    })
    dayjs.locale(lang)
  }, [i18n, lang, setNotificationData, setOpenNotification])
}

export default useHandleLangChange
