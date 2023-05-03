import { Position } from 'reactflow'
import { describe, expect, it, beforeEach } from 'vitest'
import onLayout from '@/utils/Flow/onLayout'
import { HorizontalLayout, VerticalLayout } from '@/types/NodeLayout'
import { nodes, edges } from '@/tests/fixtures/allNodes'
import { useFlowStore } from '@/store'

beforeEach(() => {
  useFlowStore.getState().resetState()
})
describe('onLayout', () => {
  it('should vertically align nodes', () => {
    onLayout(
      VerticalLayout.TopToBottom,
      nodes,
      edges,
      useFlowStore.getState().setNodes,
      useFlowStore.getState().setEdges
    )

    expect(nodes[0].position.y).toEqual(50)
    expect(nodes[1].position.y).toEqual(800)

    onLayout(
      VerticalLayout.BottomToTop,
      nodes,
      edges,
      useFlowStore.getState().setNodes,
      useFlowStore.getState().setEdges
    )

    expect(nodes[0].position.y).toEqual(800)
    expect(nodes[1].position.y).toEqual(50)
  })

  it('should horizontally align nodes', () => {
    onLayout(
      HorizontalLayout.LeftToRight,
      nodes,
      edges,
      useFlowStore.getState().setNodes,
      useFlowStore.getState().setEdges
    )

    expect(nodes[0].position.x).toEqual(50)
    expect(nodes[1].position.x).toEqual(800)

    onLayout(
      HorizontalLayout.RightToLeft,
      nodes,
      edges,
      useFlowStore.getState().setNodes,
      useFlowStore.getState().setEdges
    )

    expect(nodes[0].position.x).toEqual(800)
    expect(nodes[1].position.x).toEqual(50)
  })

  it('should handle handles according to layout', () => {
    onLayout(
      HorizontalLayout.LeftToRight,
      nodes,
      edges,
      useFlowStore.getState().setNodes,
      useFlowStore.getState().setEdges
    )

    expect(nodes[0].targetPosition).toEqual(Position.Left)
    expect(nodes[0].sourcePosition).toEqual(Position.Right)
    expect(nodes[1].targetPosition).toEqual(Position.Left)
    expect(nodes[1].sourcePosition).toEqual(Position.Right)

    onLayout(
      HorizontalLayout.RightToLeft,
      nodes,
      edges,
      useFlowStore.getState().setNodes,
      useFlowStore.getState().setEdges
    )

    expect(nodes[0].targetPosition).toEqual(Position.Right)
    expect(nodes[0].sourcePosition).toEqual(Position.Left)
    expect(nodes[1].targetPosition).toEqual(Position.Right)
    expect(nodes[1].sourcePosition).toEqual(Position.Left)

    onLayout(
      VerticalLayout.TopToBottom,
      nodes,
      edges,
      useFlowStore.getState().setNodes,
      useFlowStore.getState().setEdges
    )

    expect(nodes[0].targetPosition).toEqual(Position.Top)
    expect(nodes[0].sourcePosition).toEqual(Position.Bottom)
    expect(nodes[1].targetPosition).toEqual(Position.Top)
    expect(nodes[1].sourcePosition).toEqual(Position.Bottom)

    onLayout(
      VerticalLayout.BottomToTop,
      nodes,
      edges,
      useFlowStore.getState().setNodes,
      useFlowStore.getState().setEdges
    )

    expect(nodes[0].targetPosition).toEqual(Position.Bottom)
    expect(nodes[0].sourcePosition).toEqual(Position.Top)
    expect(nodes[1].targetPosition).toEqual(Position.Bottom)
    expect(nodes[1].sourcePosition).toEqual(Position.Top)
  })
})
