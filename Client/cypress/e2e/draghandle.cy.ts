import dragAndDropAllNodes from '../support/dragAndDropAllNodes'

describe('Drag And Drop Handle Rendering', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('drag and drop nodes to the flow', () => {
    dragAndDropAllNodes()
  })
})
export {}
