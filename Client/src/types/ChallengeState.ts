import { Challenge } from '@/types/Challenge'
import ResetState from '@/types/ResetState'

export interface ChallengeState extends ResetState {
  challenges: Challenge[] | null
  setChallenges: (challenges: Challenge[]) => void
  selectedChallenge: Challenge | null
  setSelectedChallenge: (selectedChallenge: Challenge | null) => void
}
