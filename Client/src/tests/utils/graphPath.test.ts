import { Edge, Node } from 'reactflow'
import { describe, it, expect } from 'vitest'
import uniqid from 'uniqid'
import { createGraph, findAllPaths } from '@/utils/graphPath'
import NodeTypes from '@/types/NodeTypes'

const nodes: Node[] = [
  { id: 'start_0', type: NodeTypes.Start, data: { name: 'Start' }, position: { x: 10, y: 10 } },
  { id: 'end_1', type: NodeTypes.End, data: { name: 'End' }, position: { x: 20, y: 20 } },
  { id: 'policies_2', type: NodeTypes.Policies, data: { name: 'Policies' }, position: { x: 30, y: 30 } },
  { id: 'provisioners_3', type: NodeTypes.Provisioners, data: { name: 'Provisioners' }, position: { x: 40, y: 40 } },
  { id: 'execution_4', type: NodeTypes.Execution, data: { name: 'Execution' }, position: { x: 50, y: 50 } },
  { id: 'rule_5', type: NodeTypes.Rule, data: { name: 'Rule' }, position: { x: 60, y: 60 } }
]

describe('createGraph', () => {
  it('should return a graph', () => {

    const edges: Edge[] = [
      { id: uniqid(), source: 'start_0', target: 'policies_2' },
      { id: uniqid(), source: 'policies_2', target: 'provisioners_3' },
      { id: uniqid(), source: 'provisioners_3', target: 'execution_4' },
      { id: uniqid(), source: 'execution_4', target: 'rule_5' },
      { id: uniqid(), source: 'rule_5', target: 'end_1' }
    ]
    const graph = createGraph(nodes, edges)
    expect(graph).toEqual({
      'start_0': ['policies_2'],
      'end_1': [],
      'policies_2': ['provisioners_3'],
      'provisioners_3': ['execution_4'],
      'execution_4': ['rule_5'],
      'rule_5': ['end_1']
    })
  })

  it('should return a graph with multiple paths', () => {

    const edges: Edge[] = [
      { id: uniqid(), source: 'start_0', target: 'policies_2' },
      { id: uniqid(), source: 'policies_2', target: 'provisioners_3' },
      { id: uniqid(), source: 'provisioners_3', target: 'execution_4' },
      { id: uniqid(), source: 'execution_4', target: 'rule_5' },
      { id: uniqid(), source: 'rule_5', target: 'end_1' },
      { id: uniqid(), source: 'start_0', target: 'execution_4' },
      { id: uniqid(), source: 'execution_4', target: 'end_1' }
    ]
    const graph = createGraph(nodes, edges)
    expect(graph).toEqual({
      'start_0': ['policies_2', 'execution_4'],
      'end_1': [],
      'policies_2': ['provisioners_3'],
      'provisioners_3': ['execution_4'],
      'execution_4': ['rule_5', 'end_1'],
      'rule_5': ['end_1']
    })
  })
})

describe('findAllPaths', () => {
  it('should return all paths', () => {
    const graph = {
      'start_0': ['policies_2', 'execution_4'],
      'end_1': [],
      'policies_2': ['provisioners_3'],
      'provisioners_3': ['execution_4'],
      'execution_4': ['rule_5', 'end_1'],
      'rule_5': ['end_1']
    }
    const paths = findAllPaths(graph, 'start_0', 'end_1')
    expect(paths).toEqual([
      ['start_0', 'policies_2', 'provisioners_3', 'execution_4', 'rule_5', 'end_1'],
      ['start_0', 'policies_2', 'provisioners_3', 'execution_4', 'end_1'],
      ['start_0', 'execution_4', 'rule_5', 'end_1'],
      ['start_0', 'execution_4', 'end_1']
    ])
  })


  it('should return all paths even with cycles', () => {
    const graph = {
      'start_0': ['policies_2', 'execution_4'],
      'end_1': [],
      'policies_2': ['provisioners_3'],
      'provisioners_3': ['execution_4'],
      'execution_4': ['rule_5', 'end_1', 'start_0'],
      'rule_5': ['end_1']
    }
    const paths = findAllPaths(graph, 'start_0', 'end_1')
    expect(paths).toEqual(
      [
        ['start_0', 'policies_2', 'provisioners_3', 'execution_4', 'rule_5', 'end_1'],
        ['start_0', 'policies_2', 'provisioners_3', 'execution_4', 'end_1'],
        ['start_0', 'policies_2', 'provisioners_3', 'execution_4', 'start_0', 'policies_2', 'provisioners_3', 'execution_4', 'rule_5', 'end_1'],
        ['start_0', 'policies_2', 'provisioners_3', 'execution_4', 'start_0', 'policies_2', 'provisioners_3', 'execution_4', 'end_1'],
        ['start_0', 'policies_2', 'provisioners_3', 'execution_4', 'start_0', 'execution_4', 'rule_5', 'end_1'],
        ['start_0', 'policies_2', 'provisioners_3', 'execution_4', 'start_0', 'execution_4', 'end_1'],
        ['start_0', 'execution_4', 'rule_5', 'end_1'],
        ['start_0', 'execution_4', 'end_1'],
        ['start_0', 'execution_4', 'start_0', 'policies_2', 'provisioners_3', 'execution_4', 'rule_5', 'end_1'],
        ['start_0', 'execution_4', 'start_0', 'policies_2', 'provisioners_3', 'execution_4', 'end_1'],
        ['start_0', 'execution_4', 'start_0', 'execution_4', 'rule_5', 'end_1'],
        ['start_0', 'execution_4', 'start_0', 'execution_4', 'end_1']
      ]
    )
  })
})

