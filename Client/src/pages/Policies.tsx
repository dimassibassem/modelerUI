import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Model } from '@/types/Model'
import Details from '@/components/Policies/Details'
import Header from '@/components/Policies/Header'
import PoliciesList from '@/components/Policies/PoliciesList'
import Footer from '@/components/Policies/Footer'

const loadModels = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/api/get-models`
  )
  return data
}
const Policies = () => {
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [models, setModels] = useState<Model[]>([])
  useEffect(() => {
    loadModels().then((data) => {
      setModels(data);
    })
  }, [])
  return (
    <div className="bg-white">
      <Header />
      <PoliciesList
        setSelectedModel={setSelectedModel}
        setOpenDetails={setOpenDetails}
        models={models}
      />
      <Details
        open={openDetails}
        setOpen={setOpenDetails}
        model={selectedModel}
      />
      <Footer />
    </div>
  )
}

export default Policies
