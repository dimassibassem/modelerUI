import React, { useEffect, useState } from 'react'
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { Challenge } from '@/types/Challenge'
import Details from '@/components/Policies/Details'
import PoliciesList from '@/components/Policies/PoliciesList'
import Footer from '@/components/Policies/Footer'
import 'dayjs/locale/fr'
import useHandleLangChange from '@/hooks/useHandleLanguageChange'
import Navbar from '@/components/Navbar'

const loadModels = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/process/definition`
  )
  return data
}

type BkrData = {
  id: number
  processKey: string
  processData: string
  previewData: string
  image: string
}

const Policies = () => {
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  )
  const [challenges, setChallenges] = useState<Challenge[] | null>(null)

  dayjs.extend(relativeTime)
  useEffect(() => {
    loadModels().then((res) =>
      setChallenges(
        res.map((data: BkrData) => ({
          id: data.id,
          processKey: data.processKey,
          processData: JSON.parse(data.processData),
          previewData: JSON.parse(data.previewData),
          image: data.image
        }))
      )
    )
  }, [])

  useHandleLangChange()
  return (
    <div className="bg-white">
      <Navbar showTuto={false} />
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
