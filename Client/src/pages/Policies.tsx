import React, { useEffect, useState } from 'react'
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { Strategy } from '@/types/Strategy'
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
  const [selectedModel, setSelectedModel] = useState<Strategy | null>(null)
  const [models, setModels] = useState<Strategy[]>([])

  dayjs.extend(relativeTime)
  useEffect(() => {
    loadModels().then((data) => setModels(data))
  }, [])
  useHandleLangChange()
  return (
    <div className="bg-white">
      <Header />
      <PoliciesList
        setSelectedModel={setSelectedModel}
        setOpenDetails={setOpenDetails}
        strategies={models}
      />
      <Details
        open={openDetails}
        setOpen={setOpenDetails}
        strategy={selectedModel}
      />
      <Footer />
    </div>
  )
}

export default Policies
