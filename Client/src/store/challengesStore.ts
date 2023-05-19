import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Challenge } from '@/types/Challenge'
import { ChallengeState } from '@/types/ChallengeState'

const useChallengeStore = create<ChallengeState>()(
  devtools(
    (set) => ({
      challenges: [],
      setChallenges: (challenges: Challenge[]) => {
        set({ challenges }, false, 'setChallenges')
      },
      selectedChallenge: null,
      setSelectedChallenge: (selectedChallenge: Challenge | null) => {
        set({ selectedChallenge }, false, 'setSelectedChallenge')
      },
      resetState: () =>
        set({
          challenges: [],
          selectedChallenge: null
        })
    }),
    {
      name: 'stateStore',
      enabled: import.meta.env.VITE_REDUX_DEVTOOLS_ENABLED === 'true'
    }
  )
)

export default useChallengeStore
