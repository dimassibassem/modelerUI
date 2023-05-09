import React, { useEffect, useState } from 'react'
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { Challenge } from '@/types/Challenge'
import Details from '@/components/Policies/Details'
import Header from '@/components/Policies/Header'
import PoliciesList from '@/components/Policies/PoliciesList'
import Footer from '@/components/Policies/Footer'
import 'dayjs/locale/fr'
import useHandleLangChange from '@/hooks/useHandleLanguageChange'

const loadModels = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/api/get-models`
  )
  return data
}
const Policies = () => {
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  )
  const [challenges, setChallenges] = useState<Challenge[] | null>(null)

  dayjs.extend(relativeTime)
  useEffect(() => {
    loadModels().then((data) => setChallenges(data))
  }, [])
  useHandleLangChange()
  return (
    <div className="bg-white">
      <Header />
      <PoliciesList
        setSelectedModel={setSelectedChallenge}
        setOpenDetails={setOpenDetails}
        challenges={challenges}
      />
      <Details
        open={openDetails}
        setOpen={setOpenDetails}
        challenge={selectedChallenge}
      />
      <Footer />
    </div>
  )
}

export default Policies
