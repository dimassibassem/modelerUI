import { Edge, Node, MarkerType, Position } from 'reactflow'
import { TFunction } from 'i18next'
import Channel from '@/types/enums/Channel'
import Process from '@/types/Process'

export const joyrideNodes: Node[] = [
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
      handles: {
        top: true,
        bottom: true,
        left: true,
        right: true
      },
      attributes: {},
      connectableWith: ['end', 'policies', 'execution', 'provisioners', 'rule']
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
      handles: {
        top: true,
        bottom: true,
        left: true,
        right: true
      },
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
      handles: {
        top: true,
        bottom: true,
        left: true,
        right: true
      },
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
]

export const joyrideEdges: Edge[] = [
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
]

export const joyrideProcess = (t: TFunction): Process => ({
  processKey: t('Tutorial'),
  description: t('TutorialContent'),
  steps: [],
  channels: [Channel.WEB],
  hook: {
    name: '',
    isAsync: false
  }
})

export const emptyProcess: Process = {
  processKey: '',
  description: '',
  steps: [],
  channels: [],
  hook: {
    name: '',
    isAsync: false
  }
}
