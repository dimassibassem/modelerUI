import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { HorizontalLayout, VerticalLayout } from '@/types/NodeLayout'
import CommandsState from '@/types/CommandsState'

const useCommandsStore = create<CommandsState>()(
  devtools(
    (set) => ({
      verticalLayout: VerticalLayout.TopToBottom,
      setVerticalLayout: (verticalLayout: VerticalLayout) => {
        set({ verticalLayout }, false, 'setVerticalLayout')
      },
      horizontalLayout: HorizontalLayout.LeftToRight,
      setHorizontalLayout: (horizontalLayout: HorizontalLayout) => {
        set({ horizontalLayout }, false, 'setHorizontalLayout')
      },
      isFullScreen: false,
      setIsFullScreen: (isFullScreen: boolean) => {
        set({ isFullScreen }, false, 'setIsFullScreen')
      },
      resetState: () =>
        set({
          verticalLayout: VerticalLayout.TopToBottom,
          horizontalLayout: HorizontalLayout.LeftToRight,
          isFullScreen: false
        })
    }),
    {
      name: 'commandsStore',
      enabled: import.meta.env.VITE_REDUX_DEVTOOLS_ENABLED === 'true'
    }
  )
)

export default useCommandsStore
