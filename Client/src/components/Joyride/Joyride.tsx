import React, { useState } from 'react'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'
import { shallow } from 'zustand/shallow'
import { Edge, Node } from 'reactflow'
import { useTranslation } from 'react-i18next'
import { RFState } from '@/types/store/RFState'
import { useFlowStore, useTemporalStore } from '@/store'
import useLocalStorage from '@/store/localStorage'
import State from '@/types/store/State'
import useStore from '@/store/stateStore'
import {
  emptyProcess,
  joyrideEdges,
  joyrideNodes,
  joyrideProcess
} from '@/constants/joyrideFlow'
import Process from '@/types/Process'
import useJoyrideSteps from '@/hooks/useJoyrideSteps'

const selector = (state: RFState) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  process: state.process,
  nodes: state.nodes,
  edges: state.edges,
  setSelected: state.setSelected,
  setProcess: state.setProcess
})
const selector2 = (state: State) => ({
  setProcessDefOpenModal: state.setProcessDefOpenModal,
  reactFlowInstance: state.reactFlowInstance,
  setLoaded: state.setLoaded
})
export default () => {
  const { setNodes, setEdges, setSelected, nodes, edges, setProcess, process } =
    useFlowStore(selector, shallow)
  const { setProcessDefOpenModal, reactFlowInstance, setLoaded } = useStore(
    selector2,
    shallow
  )
  const joyrideStepsList = useJoyrideSteps()
  const { t } = useTranslation()
  const run = useLocalStorage((store) => store.run)
  const setRun = useLocalStorage((store) => store.setRun)
  const [tutorial, setTutorial] = useState({
    steps: joyrideStepsList
  })
  const [realNodes, setRealNodes] = useState<Node[]>([])
  const [realEdges, setRealEdges] = useState<Edge[]>([])
  const [realProcess, setRealProcess] = useState<Process>(emptyProcess)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const { clear } = useTemporalStore((state) => state)

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index } = data
    const finishedStatuses: string[] = [
      STATUS.FINISHED,
      STATUS.SKIPPED,
      STATUS.PAUSED
    ]

    if (isFirstTime) {
      setRealNodes(nodes)
      setRealEdges(edges)
      setRealProcess(process)
      setIsFirstTime(false)
      setProcess(emptyProcess)
    }

    // eslint-disable-next-line default-case
    switch (index) {
      case 0:
        {
          setLoaded(true)
        }
        break
      case 1:
        setProcessDefOpenModal(true)
        break
      case 2:
        {
          setProcessDefOpenModal(false)
          setProcess(joyrideProcess(t))
        }
        break
      case 4:
        break
      case 5:
        {
          setSelected(null)
          setNodes([])
          setEdges([])
          setProcess(joyrideProcess(t))
        }
        break
      case 6:
        {
          setNodes(joyrideNodes)
          setEdges(joyrideEdges)
          setProcess(joyrideProcess(t))
          reactFlowInstance?.setViewport({
            zoom: 1.5,
            x: 0,
            y: 0
          })
        }
        break
      case 7:
        break
      case 8:
        setSelected(null)
        break
      case 9:
        break
      case 10:
        break
      case 11:
        setSelected(nodes[2])
        break
      case 12:
        break
      case 13:
        setSelected(edges[0])
        break
      case 14:
        break
      case 15:
        setSelected(null)
        break
    }

    if (finishedStatuses.includes(status)) {
      setSelected(null)
      setNodes(realNodes)
      setEdges(realEdges)
      setProcess(realProcess)
      clear()
      setRun(false)
      setProcessDefOpenModal(true)
      setIsFirstTime(true)
      setTutorial({
        steps: tutorial.steps
      })
    }
  }

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      disableCloseOnEsc
      disableOverlayClose
      scrollToFirstStep
      showProgress
      showSkipButton
      locale={{
        back: t('Back'),
        last: t('Last'),
        next: t('Next'),
        skip: t('Skip')
      }}
      steps={tutorial.steps}
      styles={{
        buttonNext: {
          backgroundColor: '#4f46e5'
        },
        buttonBack: {
          color: '#565555'
        },
        buttonSkip: {
          color: '#423ac7'
        },
        options: {
          zIndex: 10000
        }
      }}
    />
  )
}
