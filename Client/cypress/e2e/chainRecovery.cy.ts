import dragAndDropAllNodes from '../support/dragAndDropAllNodes'

describe('Handle Chain recovery', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Should not reconnect the chain after a node is deleted', () => {
    dragAndDropAllNodes()
    cy.dragPane({ from: { x: 100, y: 200 }, to: { x: 10, y: 0 } })
    cy.zoomPane(20)

    cy
      .get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')
      .drag('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')

    cy
      .get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-right.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')
      .drag('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-execution.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')

    // assert that the edge is visible
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g > g:nth-child(1) > path.react-flow__edge-interaction')

    cy.dragPane({ from: { x: 0, y: 100 }, to: { x: 0, y: 200 } })

    cy
      .get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-execution.nopan.selectable > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')
      .drag('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan.selectable > div > div.react-flow__handle.react-flow__handle-right.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')


    // assert that edge is visible
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g > g:nth-child(2) > path.react-flow__edge-interaction')

    // Node to delete
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div:nth-child(1) > img')
      .click()

    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selected.selectable > div > div:nth-child(9) > img')
      .realPress('Backspace')

    // assert that edge is not exist
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g  > path.react-flow__edge-interaction')
      .should('not.exist')

    // assert that edge is not exist
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g > g:nth-child(2) > path.react-flow__edge-interaction')
      .should('not.exist')
  })

  it('Should reconnect the chain after a node is deleted', () => {
    dragAndDropAllNodes()
    cy.dragPane({ from: { x: 100, y: 200 }, to: { x: 10, y: 0 } })
    cy.zoomPane(20)
    // cy.dragPane({ from: { x: 100, y: 190 }, to: { x: 0, y: 0 } })
    // cy.zoomPane(100)

    cy
      .get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')
      .drag('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')

    cy
      .get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-right.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')
      .drag('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-execution.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')

    // assert that the edge is visible
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g > g:nth-child(1) > path.react-flow__edge-interaction')

    cy
      .get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-execution.nopan.selectable > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')
      .drag('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan.selectable > div > div.react-flow__handle.react-flow__handle-right.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator')


    // assert that edge is visible
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g > g:nth-child(2) > path.react-flow__edge-interaction')


    // click on chain recovery button
    cy.get('#chainRecovery')
      .click()


    // Node to delete
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div:nth-child(1) > img')
      .click()

    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selected.selectable > div > div:nth-child(9) > img')
      .realPress('Backspace')

    // assert that edge not exist
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g  > path.react-flow__edge-interaction')
      .should('not.exist')

    // assert that edge exist
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g > g:nth-child(2) > path.react-flow__edge-interaction')
      .should('exist')
  })
})




