import React, { useState } from 'react'
import { Model } from '@/types/Model'
import Details from '@/components/Policies/Details'
import Header from '@/components/Policies/Header'
import PoliciesList from '@/components/Policies/PoliciesList'
import Footer from '@/components/Policies/Footer'

const Policies = () => {
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  return (
    <div className="bg-white">
      <Header />
      <PoliciesList
        setSelectedModel={setSelectedModel}
        setOpenDetails={setOpenDetails}
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
