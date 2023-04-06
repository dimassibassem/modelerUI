import dragAndDropAllNodes from '../support/dragAndDropAllNodes'

describe('Drag And Drop Handle Rendering', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('drag and drop nodes to the flow', () => {
    dragAndDropAllNodes()
    cy.dragPane({ from: { x: 100, y: 200 }, to: { x: 10, y: 0 } })
    cy.zoomPane(20)
  })
})
export {}
