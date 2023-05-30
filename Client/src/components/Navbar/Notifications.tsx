import React, { useId } from 'react'
import { Menu } from '@headlessui/react'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import State from '@/types/store/State'
import useStore from '@/store/stateStore'

const selector = (state: State) => ({
  notificationStack: state.notificationStack
})
const Notifications = () => {
  const { notificationStack } = useStore(selector, shallow)
  const { t } = useTranslation()
  const notificationId = useId()
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-0 z-10 mt-2 w-80 max-h-60 overflow-y-auto  origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1 ">
          {notificationStack
            .map((notification, index) => (
              <Menu.Item key={`${notificationId + index}`}>
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                  <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <div className="flex items-start">
                        {notification.success ? (
                          <>
                            <div className="flex-shrink-0">
                              <CheckCircleIcon
                                className="h-6 w-6 text-green-400"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                              <p className="text-sm font-medium text-gray-900">
                                {t(notification.message)}
                              </p>
                              {/* <p className='mt-1 text-sm text-gray-500'>lorem ipsum.</p> */}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex-shrink-0">
                              <ExclamationTriangleIcon
                                className="h-6 w-6 text-red-400"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                              <p className="text-sm font-medium text-gray-900">
                                {t(notification.message)}
                              </p>
                              {/* <p className='mt-1 text-sm text-gray-500'>lorem ipsum</p> */}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Menu.Item>
            ))
            .reverse()}
        </div>
      </Menu.Items>
    </Menu>
  )
}

export default Notifications
