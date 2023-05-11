import { Edge, Node } from 'reactflow'
import { v4 as uuid } from 'uuid'
import NodeType from '@/types/NodeType'

const nodes: Node[] = [
  {
    id: 'start_0',
    type: NodeType.Start,
    data: {
      name: 'Start',
      handles: {
        top: true,
        right: true,
        bottom: true,
        left: true
      }
    },
    position: { x: 10, y: 10 }
  },
  {
    id: 'end_1',
    type: NodeType.End,
    data: {
      name: 'End',
      handles: {
        top: true,
        right: true,
        bottom: true,
        left: true
      }
    },
    position: { x: 20, y: 20 }
  },
  {
    id: 'policies_2',
    type: NodeType.Policies,
    data: {
      name: 'Policies',
      handles: {
        top: true,
        right: true,
        bottom: true,
        left: true
      },
      attributes: {
        name: 'policy',
        channel: 'WEB'
      }
    },
    position: { x: 30, y: 30 }
  },
  {
    id: 'provisioners_3',
    type: NodeType.Provisioners,
    data: {
      name: 'Provisioners',
      handles: {
        top: true,
        right: true,
        bottom: true,
        left: true
      }
    },
    position: { x: 40, y: 40 }
  },
  {
    id: 'execution_4',
    type: NodeType.Execution,
    data: {
      name: 'Execution',
      handles: {
        top: true,
        right: true,
        bottom: true,
        left: true
      }
    },
    position: { x: 50, y: 50 }
  },
  {
    id: 'rule_5',
    type: NodeType.Rule,
    data: {
      name: 'Rule',
      handles: {
        top: true,
        right: true,
        bottom: true,
        left: true
      }
    },
    position: { x: 60, y: 60 }
  }
]

const edges: Edge[] = [
  { id: uuid(), source: 'start_0', target: 'policies_2' },
  { id: uuid(), source: 'policies_2', target: 'provisioners_3' },
  { id: uuid(), source: 'provisioners_3', target: 'execution_4' },
  { id: uuid(), source: 'execution_4', target: 'rule_5' },
  { id: uuid(), source: 'rule_5', target: 'end_1' }
]

export { nodes, edges }
