import { Edge, Node, Position } from 'reactflow'
import { describe, expect, it } from 'vitest'
import onLayout from '@/utils/onLayout'
import { HorizontalLayout, VerticalLayout } from '@/types/NodeLayout'
import NodeTypes from '@/types/NodeTypes'

let nodes: Node[] = [
  {
    id: 'start_0',
    type: NodeTypes.Start,
    targetPosition: Position.Top,
    data: {},
    position: { x: 0, y: 0 }
  },
  {
    id: 'end_1',
    type: NodeTypes.End,
    sourcePosition: Position.Bottom,
    data: {},
    position: { x: 200, y: 200 }
  }
]
let edges: Edge[] = [
  {
    id: 'start_0-from-top-->end_1-from-bottom',
    source: 'start_0',
    target: 'end_1'
  }
]
const setNodes = (nds: Node[]) => {
  nodes = nds
}

const setEdges = (edgs: Edge[]) => {
  edges = edgs
}

describe('onLayout', () => {
  it('should vertically align nodes', () => {

    onLayout(VerticalLayout.TopToBottom, nodes, edges, setNodes, setEdges)

    expect(nodes[0].position.y).toEqual(50)
    expect(nodes[1].position.y).toEqual(200)

    onLayout(VerticalLayout.BottomToTop, nodes, edges, setNodes, setEdges)

    expect(nodes[0].position.y).toEqual(200)
    expect(nodes[1].position.y).toEqual(50)

  })

  it('should horizontally align nodes', () => {

    onLayout(HorizontalLayout.LeftToRight, nodes, edges, setNodes, setEdges)

    expect(nodes[0].position.x).toEqual(50)
    expect(nodes[1].position.x).toEqual(200)

    onLayout(HorizontalLayout.RightToLeft, nodes, edges, setNodes, setEdges)

    expect(nodes[0].position.x).toEqual(200)
    expect(nodes[1].position.x).toEqual(50)
  })

  it('should handle handles according to layout', () => {

    onLayout(HorizontalLayout.LeftToRight, nodes, edges, setNodes, setEdges)

    expect(nodes[0].targetPosition).toEqual(Position.Left)
    expect(nodes[0].sourcePosition).toEqual(Position.Right)
    expect(nodes[1].targetPosition).toEqual(Position.Left)
    expect(nodes[1].sourcePosition).toEqual(Position.Right)

    onLayout(HorizontalLayout.RightToLeft, nodes, edges, setNodes, setEdges)

    expect(nodes[0].targetPosition).toEqual(Position.Right)
    expect(nodes[0].sourcePosition).toEqual(Position.Left)
    expect(nodes[1].targetPosition).toEqual(Position.Right)
    expect(nodes[1].sourcePosition).toEqual(Position.Left)

    onLayout(VerticalLayout.TopToBottom, nodes, edges, setNodes, setEdges)

    expect(nodes[0].targetPosition).toEqual(Position.Top)
    expect(nodes[0].sourcePosition).toEqual(Position.Bottom)
    expect(nodes[1].targetPosition).toEqual(Position.Top)
    expect(nodes[1].sourcePosition).toEqual(Position.Bottom)

    onLayout(VerticalLayout.BottomToTop, nodes, edges, setNodes, setEdges)

    expect(nodes[0].targetPosition).toEqual(Position.Bottom)
    expect(nodes[0].sourcePosition).toEqual(Position.Top)
    expect(nodes[1].targetPosition).toEqual(Position.Bottom)
    expect(nodes[1].sourcePosition).toEqual(Position.Top)


  })
})


