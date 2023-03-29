import { Edge, Node } from 'reactflow'
import { createGraph, findAllPaths } from '@/utils/graphPath'
import NodeTypes from '@/types/NodeTypes'
import { describe, it, expect } from 'vitest'

const nodes: Node[] = [
  { id: '1', type: NodeTypes.Start, data: { name: 'Start' }, position: { x: 10, y: 10 } },
  { id: '2', type: NodeTypes.End, data: { name: 'End' }, position: { x: 20, y: 20 } },
  { id: '3', type: NodeTypes.Policies, data: { name: 'Policies' }, position: { x: 30, y: 30 } },
  { id: '4', type: NodeTypes.Provisioners, data: { name: 'Provisioners' }, position: { x: 40, y: 40 } },
  { id: '5', type: NodeTypes.Execution, data: { name: 'Execution' }, position: { x: 50, y: 50 } },
  { id: '6', type: NodeTypes.Rule, data: { name: 'Rule' }, position: { x: 60, y: 60 } }
]

describe('createGraph', () => {
  it('should return a graph', () => {

    const edges: Edge[] = [
      { id: '1-3', source: '1', target: '3' },
      { id: '3-4', source: '3', target: '4' },
      { id: '4-5', source: '4', target: '5' },
      { id: '5-6', source: '5', target: '6' },
      { id: '6-2', source: '6', target: '2' }
    ]
    const graph = createGraph(nodes, edges)
    expect(graph).toEqual({
      '1': ['3'],
      '2': [],
      '3': ['4'],
      '4': ['5'],
      '5': ['6'],
      '6': ['2']
    })
  })

  it('should return a graph with multiple paths', () => {

    const edges: Edge[] = [
      { id: '1-3', source: '1', target: '3' },
      { id: '3-4', source: '3', target: '4' },
      { id: '4-5', source: '4', target: '5' },
      { id: '5-6', source: '5', target: '6' },
      { id: '6-2', source: '6', target: '2' },
      { id: '1-5', source: '1', target: '5' },
      { id: '5-2', source: '5', target: '2' }
    ]
    const graph = createGraph(nodes, edges)
    expect(graph).toEqual({
      '1': ['3', '5'],
      '2': [],
      '3': ['4'],
      '4': ['5'],
      '5': ['6', '2'],
      '6': ['2']
    })
  })
})

describe('findAllPaths', () => {
  it('should return all paths', () => {
    const graph = {
      '1': ['3', '5'],
      '2': [],
      '3': ['4'],
      '4': ['5'],
      '5': ['6', '2'],
      '6': ['2']
    }
    const paths = findAllPaths(graph, '1', '2')
    expect(paths).toEqual([
      ['1', '3', '4', '5', '6', '2'],
      ['1', '3', '4', '5', '2'],
      ['1', '5', '6', '2'],
      ['1', '5', '2']
    ])
  })


  it('should return all paths even with cycles', () => {
    const graph = {
      '1': ['3', '5'],
      '2': [],
      '3': ['4'],
      '4': ['5'],
      '5': ['6', '2', '1'],
      '6': ['2']
    }
    const paths = findAllPaths(graph, '1', '2')
    expect(paths).toEqual(
      [
        ['1', '3', '4', '5', '6', '2'],
        ['1', '3', '4', '5', '2'],
        ['1', '3', '4', '5', '1', '3', '4', '5', '6', '2'],
        ['1', '3', '4', '5', '1', '3', '4', '5', '2'],
        ['1', '3', '4', '5', '1', '5', '6', '2'],
        ['1', '3', '4', '5', '1', '5', '2'],
        ['1', '5', '6', '2'],
        ['1', '5', '2'],
        ['1', '5', '1', '3', '4', '5', '6', '2'],
        ['1', '5', '1', '3', '4', '5', '2'],
        ['1', '5', '1', '5', '6', '2'],
        ['1', '5', '1', '5', '2']
      ]
    )
  })
})

