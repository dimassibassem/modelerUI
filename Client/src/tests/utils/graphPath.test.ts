import { Edge, Node } from 'reactflow'
import { describe, it, expect } from 'vitest'
import { v4 as uuid } from 'uuid'
import { createGraph, findAllPaths } from '@/utils/Flow/graphPath'
import NodeType from '@/types/NodeType'

const nodes: Node[] = [
  {
    id: 'start_0',
    type: NodeType.Start,
    data: { name: 'Start' },
    position: { x: 10, y: 10 }
  },
  {
    id: 'end_1',
    type: NodeType.End,
    data: { name: 'End' },
    position: { x: 20, y: 20 }
  },
  {
    id: 'policies_2',
    type: NodeType.Policies,
    data: { name: 'Policies' },
    position: { x: 30, y: 30 }
  },
  {
    id: 'provisioners_3',
    type: NodeType.Provisioners,
    data: { name: 'Provisioners' },
    position: { x: 40, y: 40 }
  },
  {
    id: 'execution_4',
    type: NodeType.Execution,
    data: { name: 'Execution' },
    position: { x: 50, y: 50 }
  },
  {
    id: 'rule_5',
    type: NodeType.Rule,
    data: { name: 'Rule' },
    position: { x: 60, y: 60 }
  }
]

describe('createGraph', () => {
  it('should return a graph', () => {
    const edges: Edge[] = [
      { id: uuid(), source: 'start_0', target: 'policies_2' },
      { id: uuid(), source: 'policies_2', target: 'provisioners_3' },
      { id: uuid(), source: 'provisioners_3', target: 'execution_4' },
      { id: uuid(), source: 'execution_4', target: 'rule_5' },
      { id: uuid(), source: 'rule_5', target: 'end_1' }
    ]
    const graph = createGraph(nodes, edges)
    expect(graph).toEqual({
      start_0: ['policies_2'],
      end_1: [],
      policies_2: ['provisioners_3'],
      provisioners_3: ['execution_4'],
      execution_4: ['rule_5'],
      rule_5: ['end_1']
    })
  })

  it('should return a graph with multiple paths', () => {
    const edges: Edge[] = [
      { id: uuid(), source: 'start_0', target: 'policies_2' },
      { id: uuid(), source: 'policies_2', target: 'provisioners_3' },
      { id: uuid(), source: 'provisioners_3', target: 'execution_4' },
      { id: uuid(), source: 'execution_4', target: 'rule_5' },
      { id: uuid(), source: 'rule_5', target: 'end_1' },
      { id: uuid(), source: 'start_0', target: 'execution_4' },
      { id: uuid(), source: 'execution_4', target: 'end_1' }
    ]
    const graph = createGraph(nodes, edges)
    expect(graph).toEqual({
      start_0: ['policies_2', 'execution_4'],
      end_1: [],
      policies_2: ['provisioners_3'],
      provisioners_3: ['execution_4'],
      execution_4: ['rule_5', 'end_1'],
      rule_5: ['end_1']
    })
  })
})

describe('findAllPaths', () => {
  it('should return all paths', () => {
    const graph = {
      start_0: ['policies_2', 'execution_4'],
      end_1: [],
      policies_2: ['provisioners_3'],
      provisioners_3: ['execution_4'],
      execution_4: ['rule_5', 'end_1'],
      rule_5: ['end_1']
    }
    const paths = findAllPaths(graph, 'start_0', 'end_1')
    expect(paths).toEqual([
      [
        'start_0',
        'policies_2',
        'provisioners_3',
        'execution_4',
        'rule_5',
        'end_1'
      ],
      ['start_0', 'policies_2', 'provisioners_3', 'execution_4', 'end_1'],
      ['start_0', 'execution_4', 'rule_5', 'end_1'],
      ['start_0', 'execution_4', 'end_1']
    ])
  })

  it('should return all paths even with cycles', () => {
    const graph = {
      start_0: ['policies_2', 'execution_4'],
      end_1: [],
      policies_2: ['provisioners_3'],
      provisioners_3: ['execution_4'],
      execution_4: ['rule_5', 'end_1', 'start_0'],
      rule_5: ['end_1']
    }
    const paths = findAllPaths(graph, 'start_0', 'end_1')
    expect(paths).toEqual([
      [
        'start_0',
        'policies_2',
        'provisioners_3',
        'execution_4',
        'rule_5',
        'end_1'
      ],
      ['start_0', 'policies_2', 'provisioners_3', 'execution_4', 'end_1'],
      [
        'start_0',
        'policies_2',
        'provisioners_3',
        'execution_4',
        'start_0',
        'policies_2',
        'provisioners_3',
        'execution_4',
        'rule_5',
        'end_1'
      ],
      [
        'start_0',
        'policies_2',
        'provisioners_3',
        'execution_4',
        'start_0',
        'policies_2',
        'provisioners_3',
        'execution_4',
        'end_1'
      ],
      [
        'start_0',
        'policies_2',
        'provisioners_3',
        'execution_4',
        'start_0',
        'execution_4',
        'rule_5',
        'end_1'
      ],
      [
        'start_0',
        'policies_2',
        'provisioners_3',
        'execution_4',
        'start_0',
        'execution_4',
        'end_1'
      ],
      ['start_0', 'execution_4', 'rule_5', 'end_1'],
      ['start_0', 'execution_4', 'end_1'],
      [
        'start_0',
        'execution_4',
        'start_0',
        'policies_2',
        'provisioners_3',
        'execution_4',
        'rule_5',
        'end_1'
      ],
      [
        'start_0',
        'execution_4',
        'start_0',
        'policies_2',
        'provisioners_3',
        'execution_4',
        'end_1'
      ],
      ['start_0', 'execution_4', 'start_0', 'execution_4', 'rule_5', 'end_1'],
      ['start_0', 'execution_4', 'start_0', 'execution_4', 'end_1']
    ])
  })
})
