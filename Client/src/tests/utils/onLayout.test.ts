import { Edge, Node } from 'reactflow'
import { describe, it, expect } from 'vitest'
import onLayout from '@/utils/onLayout'
import { VerticalLayout } from '@/types/NodeLayout'
import NodeTypes from '@/types/NodeTypes'

describe('onLayout', () => {
  it('should vertically align nodes', () => {

    let nodes: Node[] = [
      {
        id: '1',
        type: NodeTypes.Start,
        data: { label: 'Node 1' },
        position: { x: 0, y: 0 }
      },
      {
        id: '2',
        type: NodeTypes.End,
        data: { label: 'Node 2' },
        position: { x: 200, y: 200 }
      }
    ]
    let edges = [
      {
        id: 'e1',
        source: '1',
        target: '2'
      }
    ]
    const setNodes = (nds: Node[]) => {
      nodes = nds
    }

    const setEdges = (edgs: Edge[]) => {
      edges = edgs
    }


    onLayout(VerticalLayout.TopToBottom, nodes, edges, setNodes, setEdges)

    expect(nodes[0].position.y).toEqual(50)
    expect(nodes[0].position.x).toEqual(100)
    expect(nodes[1].position.y).toEqual(200)

  })
})

