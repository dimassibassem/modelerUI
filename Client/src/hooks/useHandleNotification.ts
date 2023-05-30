import { shallow } from 'zustand/shallow'
import { useCallback, useEffect } from 'react'
import useStore from '@/store/stateStore'
import State, { NotificationData } from '@/types/store/State'

const selector = (state: State) => ({
  notificationData: state.notificationData,
  setNotificationData: state.setNotificationData,
  openNotification: state.openNotification,
  setOpenNotification: state.setOpenNotification,
  notificationStack: state.notificationStack,
  setNotificationStack: state.setNotificationStack
})

const useHandleNotification = () => {
  const {
    notificationData,
    setNotificationData,
    openNotification,
    setOpenNotification,
    notificationStack,
    setNotificationStack
  } = useStore(selector, shallow)
  useEffect(() => {
    if (openNotification) {
      const timeout = setTimeout(() => {
        setOpenNotification(false)
      }, 5000)
      return () => clearTimeout(timeout)
    }
    return () => {}
  }, [openNotification, notificationData, setOpenNotification])

  return useCallback(
    (newNotificationData: NotificationData) => {
      setNotificationData(newNotificationData)
      setOpenNotification(true)
      setNotificationStack([...notificationStack, newNotificationData])
    },
    [
      notificationData,
      setNotificationData,
      openNotification,
      setOpenNotification,
      notificationStack,
      setNotificationStack
    ]
  )
}

export default useHandleNotification
