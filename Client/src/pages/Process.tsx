import React, { useEffect, useState } from 'react'
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { shallow } from 'zustand/shallow'
import Details from '@/components/Process/Details'
import ProcessList from '@/components/Process/ProcessList'
import Footer from '@/components/Process/Footer'
import 'dayjs/locale/fr'
import useHandleLangChange from '@/hooks/useHandleLanguageChange'
import Navbar from '@/components/Navbar/Navbar'
import { ProcessBKRState } from '@/types/store/ProcessBKRState'
import useProcessBKRModelStore from '@/store/processBKRModelStore'
import BkrData from '@/types/BkrData'

const loadModels = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/process/definition`
  )
  return data
}

const selector = (state: ProcessBKRState) => ({
  setProcessesBKRModel: state.setProcessesBKRModel,
  processesBKRModel: state.processesBKRModel,
  setSelectedProcessBKRModel: state.setSelectedProcessBKRModel,
  selectedProcessBKRModel: state.selectedProcessBKRModel
})
const Process = () => {
  const [openDetails, setOpenDetails] = useState(false)
  const {
    setProcessesBKRModel,
    processesBKRModel,
    setSelectedProcessBKRModel,
    selectedProcessBKRModel
  } = useProcessBKRModelStore(selector, shallow)
  const [loaded, setLoaded] = useState(false)
  dayjs.extend(relativeTime)
  useEffect(() => {
    loadModels().then((res) => {
      setProcessesBKRModel(
        res.map((data: BkrData) => ({
          id: data.id,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          processKey: data.processKey,
          processData: JSON.parse(data.processData),
          previewData: JSON.parse(data.previewData),
          image: data.image
        }))
      )
      setLoaded(true)
    })
  }, [])
  useHandleLangChange()
  return (
    <div className="bg-white">
      <Navbar showTuto={false} />
      <ProcessList
        setSelectedModel={setSelectedProcessBKRModel}
        setOpenDetails={setOpenDetails}
        processesBKRModel={processesBKRModel}
        loaded={loaded}
      />
      <Details
        open={openDetails}
        setOpen={setOpenDetails}
        selectedProcessBKRModel={selectedProcessBKRModel}
      />
      <Footer />
    </div>
  )
}

export default Process
