import React, { useEffect, useState } from 'react'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride'
import { shallow } from 'zustand/shallow'
import { MarkerType, Position, ReactFlowInstance } from 'reactflow'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'
import joyrideSteps from './JoyrideSupport'

interface State {
  run: boolean
  steps: Step[]
}

const selector = (state: RFState) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  nodes: state.nodes,
  edges: state.edges,
  setSelected: state.setSelected,
  setProcess: state.setProcess
})
export default ({
  setOpenModal,
  reactFlowInstance
}: {
  setOpenModal: (open: boolean) => void
  reactFlowInstance: ReactFlowInstance | null
}) => {
  const { setNodes, setEdges, setSelected, nodes, edges, setProcess } =
    useFlowStore(selector, shallow)
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: joyrideSteps
  })

  useEffect(() => {
    setState((state) => ({
      ...state,
      run: true
    }))
  }, [setState])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]
    // eslint-disable-next-line default-case
    switch (index) {
      case 0:
      case 1:
        setOpenModal(true)
        break
      case 2:
        setOpenModal(false)
        break
      case 3:
      case 4:
        {
          setSelected(null)
          if (nodes) {
            setNodes([])
          }
          if (edges) {
            setEdges([])
          }
          setProcess({
            name: 'Tutorial',
            description: 'This is a tutorial',
            steps: [],
            hook: {
              name: '',
              channel: '',
              isAsync: false
            }
          })
        }
        break
      case 5:
        {
          setNodes([
            {
              id: 'start_0',
              type: 'start',
              position: {
                x: 50,
                y: 50
              },
              data: {
                label: 'start_0',
                text: '',
                handles: [
                  {
                    position: 'top',
                    enable: true
                  },
                  {
                    position: 'bottom',
                    enable: true
                  },
                  {
                    position: 'left',
                    enable: true
                  },
                  {
                    position: 'right',
                    enable: true
                  }
                ],
                attributes: {},
                connectableWith: [
                  'end',
                  'policies',
                  'execution',
                  'provisioners',
                  'rule'
                ]
              },
              width: 50,
              height: 50,
              selected: false,
              positionAbsolute: {
                x: 119.99999999999994,
                y: 141.99999999999994
              },
              dragging: false,
              targetPosition: Position.Left,
              sourcePosition: Position.Right
            },
            {
              id: 'end_1',
              type: 'end',
              position: {
                x: 350,
                y: 50
              },
              data: {
                label: 'end_1',
                text: '',
                handles: [
                  {
                    position: 'top',
                    enable: true
                  },
                  {
                    position: 'bottom',
                    enable: true
                  },
                  {
                    position: 'left',
                    enable: true
                  },
                  {
                    position: 'right',
                    enable: true
                  }
                ],
                attributes: {},
                connectableWith: []
              },
              width: 50,
              height: 50,
              targetPosition: Position.Left,
              sourcePosition: Position.Right,
              selected: false,
              dragging: false,
              positionAbsolute: {
                x: 216.2634559672906,
                y: 102.3259018078045
              }
            },
            {
              id: 'policies_2',
              type: 'policies',
              position: {
                x: 200,
                y: 50
              },
              data: {
                label: 'policies_2',
                text: '',
                handles: [
                  {
                    position: 'top',
                    enable: true
                  },
                  {
                    position: 'bottom',
                    enable: true
                  },
                  {
                    position: 'left',
                    enable: true
                  },
                  {
                    position: 'right',
                    enable: true
                  }
                ],
                attributes: {
                  name: '',
                  channel: ''
                },
                connectableWith: ['end', 'policies', 'execution', 'rule']
              },
              width: 50,
              height: 50,
              selected: false,
              positionAbsolute: {
                x: 137.8679656440358,
                y: 100.20458146424485
              },
              dragging: false,
              targetPosition: Position.Left,
              sourcePosition: Position.Right
            }
          ])
          setEdges([
            {
              source: 'start_0',
              sourceHandle: 'right',
              target: 'policies_2',
              targetHandle: 'left',
              markerEnd: {
                type: MarkerType.Arrow
              },
              id: 'reactflow__edge-start_0right-policies_2left'
            },
            {
              source: 'policies_2',
              sourceHandle: 'right',
              target: 'end_1',
              targetHandle: 'left',
              id: 'lgbkpoge',
              markerEnd: {
                type: MarkerType.Arrow
              }
            }
          ])
          setProcess({
            name: 'Tutorial',
            description: 'This is a tutorial',
            steps: [],
            hook: {
              name: '',
              channel: '',
              isAsync: false
            }
          })
          reactFlowInstance?.setViewport({
            zoom: 1.5,
            x: 0,
            y: 0
          })
        }
        break
      case 8:
      case 9:
        setSelected(null)
        break
      case 10:
      case 11:
        {
          setSelected(nodes[2])
        }
        break
      case 12:
      case 13:
        {
          setSelected(edges[0])
        }
        break
      case 14:
        {
          setSelected(null)
        }
        break
    }

    if (finishedStatuses.includes(status)) {
      setSelected(null)
      setProcess({
        name: '',
        description: '',
        steps: [],
        hook: {
          name: '',
          channel: '',
          isAsync: false
        }
      })
      setNodes([])
      setEdges([])
      setOpenModal(true)
      setState((state) => ({
        ...state,
        run: false
      }))
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
      steps={steps}
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