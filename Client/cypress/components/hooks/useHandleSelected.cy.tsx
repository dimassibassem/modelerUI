import ReactFlow, { Edge, Node } from 'reactflow'
import useHandleSelected from '@/hooks/useHandleSelected'


const Flowchart = ({ nodes, edges, setSelectedNode, setSelectedEdge }: {
  nodes: Node[]; edges: Edge[],
  setSelectedNode: (node: Node | null) => void;
  setSelectedEdge: (edge: Edge | null) => void
}) => {
  useHandleSelected(nodes, edges, setSelectedNode, setSelectedEdge)
  return (
    <ReactFlow className='h-full grow' nodes={nodes} edges={edges} />
  )
}

describe('useHandleSelected', () => {
  it('should update selected node and edge', () => {
    const nodes = [
      { id: 'node1', selected: false, dragging: false, data: {}, position: { x: 10, y: 20 } },
      { id: 'node2', selected: true, dragging: false, data: {}, position: { x: 20, y: 80 } },
      { id: 'node3', selected: false, dragging: false, data: {}, position: { x: 30, y: 120 } }]
    const edges = [
      { id: 'edge1', selected: false, source: 'node1', target: 'node2' },
      { id: 'edge2', selected: true, source: 'node2', target: 'node3' }
    ]
    const setSelectedNode = cy.stub().as('setSelectedNode')
    const setSelectedEdge = cy.stub().as('setSelectedEdge')
    cy.mount(
      <Flowchart nodes={nodes} edges={edges} setSelectedEdge={setSelectedEdge} setSelectedNode={setSelectedNode} />
    )
    cy.get('@setSelectedNode').should('have.been.calledWith', nodes[1])
    cy.get('@setSelectedEdge').should('have.been.calledWith', edges[1])
  })

  it('should clear selected node and edge', () => {
    const nodes = [
      { id: 'node1', selected: false, dragging: false, data: {}, position: { x: 10, y: 20 } },
      { id: 'node2', selected: false, dragging: false, data: {}, position: { x: 20, y: 80 } },
      { id: 'node3', selected: false, dragging: false, data: {}, position: { x: 30, y: 120 } }]
    const edges = [
      { id: 'edge1', selected: false, source: 'node1', target: 'node2' },
      { id: 'edge2', selected: false, source: 'node2', target: 'node3' }
    ]
    const setSelectedNode = cy.stub().as('setSelectedNode')
    const setSelectedEdge = cy.stub().as('setSelectedEdge')
    cy.mount(
      <Flowchart nodes={nodes} edges={edges} setSelectedEdge={setSelectedEdge} setSelectedNode={setSelectedNode} />
    )
    cy.get('@setSelectedNode').should('have.been.calledWith', null)
    cy.get('@setSelectedEdge').should('have.been.calledWith', null)
  })
})
