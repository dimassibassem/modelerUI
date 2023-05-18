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
import { ChallengeState } from "@/types/ChallengeState";
import { shallow } from "zustand/shallow";
import useChallengeStore from "@/store/challengesStore";

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


const selector = (state: ChallengeState) => ({
  challenges: state.challenges,
  setChallenges: state.setChallenges,
  selectedChallenge: state.selectedChallenge,
  setSelectedChallenge: state.setSelectedChallenge
})
const Policies = () => {
  const [openDetails, setOpenDetails] = useState(false)
const { challenges, setChallenges, selectedChallenge, setSelectedChallenge } = useChallengeStore(selector, shallow)
  const [loaded, setLoaded] = useState(false)
  dayjs.extend(relativeTime)
  useEffect(() => {
    loadModels().then((res) => {
        setChallenges(
          res.map((data: BkrData) => ({
            id: data.id,
            processKey: data.processKey,
            processData: JSON.parse(data.processData),
            previewData: JSON.parse(data.previewData),
            image: data.image
          }))
        );
        setLoaded(true);
      }
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
        loaded={loaded}
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
