import dragAndDropAllNodes from '../support/dragAndDropAllNodes'

describe('Valid steps in Sidebar', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Should render valid steps in sidebar', () => {
    dragAndDropAllNodes()

    cy
      .get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')
      .drag('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')


    cy.get('#root > div > aside > div:nth-child(6)')
      .should('be.visible')
  })
})



