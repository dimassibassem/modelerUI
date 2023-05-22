import axios from 'axios'
import { Challenge } from '@/types/Challenge'

async function deleteChallenge(
  id: number | undefined,
  challenges: Challenge[] | null,
  setChallenges: (challenges: Challenge[]) => void
) {
  if (id) {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/process/definition/${id}`
    )
    if (res.status === 200) {
      const newChallenges = challenges?.filter(
        (challenge) => challenge.id !== id
      )
      if (newChallenges) {
        setChallenges(newChallenges)
      }
    }
  }
}

export default deleteChallenge
