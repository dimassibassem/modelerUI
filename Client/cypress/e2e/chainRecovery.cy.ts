import initWithAllNodes from '../support/initWithAllNodes'
import skipTutorial from '../support/skipTutorial'

describe('Handle Chain recovery', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#loading').should('exist')
    cy.get('#loading', { timeout: 10000 }).should('not.exist')
    skipTutorial()
  })

  it('Should not reconnect the chain after a node is deleted', () => {
    initWithAllNodes()
    cy.dragPane({ from: { x: 100, y: 200 }, to: { x: 10, y: 0 } })
    cy.zoomPane(20)

    cy.get(
      'div.react-flow__nodes > div > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      'div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    cy.get(
      '.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-right.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      'div.react-flow__node.react-flow__node-execution.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    // assert that the edge is visible
    cy.get(
      'div.react-flow__renderer > div > div > svg > g > g:nth-child(1) > path.react-flow__edge-interaction'
    )

    cy.dragPane({ from: { x: 0, y: 100 }, to: { x: 0, y: 200 } })

    cy.get(
      'div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-execution.nopan.selectable > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      '.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan.selectable > div > div.react-flow__handle.react-flow__handle-right.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    // assert that edge is visible
    cy.get(
      '.react-flow__renderer > div > div > svg > g > g:nth-child(2) > path.react-flow__edge-interaction'
    )

    cy.dragPane({ from: { x: 0, y: 100 }, to: { x: 0, y: 200 } })
    // Node to delete
    cy.get(
      '.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div > img'
    ).realClick()

    cy.get('.selected').realPress('Backspace')

    // assert that edge is not exist
    cy.get(
      ' div.react-flow__renderer > div > div > svg > g  > path.react-flow__edge-interaction'
    ).should('not.exist')

    // assert that edge is not exist
    cy.get(
      '.react-flow__renderer > div > div > svg > g > g:nth-child(2) > path.react-flow__edge-interaction'
    ).should('not.exist')
  })

  it('Should reconnect the chain after a node is deleted', () => {
    initWithAllNodes()
    cy.dragPane({ from: { x: 100, y: 200 }, to: { x: 10, y: 0 } })
    cy.zoomPane(20)
    // cy.dragPane({ from: { x: 100, y: 190 }, to: { x: 0, y: 0 } })
    // cy.zoomPane(100)

    cy.get(
      ' div.react-flow__renderer > div > div > div.react-flow__nodes > div > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      ' div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    cy.get(
      ' div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-right.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      ' div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-execution.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    // assert that the edge is visible
    cy.get(
      'div.react-flow__renderer > div > div > svg > g > g:nth-child(1) > path.react-flow__edge-interaction'
    )

    cy.get(
      'div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-execution.nopan.selectable > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      'div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan.selectable > div > div.react-flow__handle.react-flow__handle-right.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    // assert that edge is visible
    cy.get(
      'div.react-flow__renderer > div > div > svg > g > g:nth-child(2) > path.react-flow__edge-interaction'
    )

    // click on chain recovery button
    cy.get('#chainRecovery').click()

    // Node to delete
    cy.get(
      '.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div > img'
    ).realClick()

    cy.get('.selected').realPress('Backspace')

    // assert that edge not exist
    cy.get(
      'div.react-flow__renderer > div > div > svg > g  > path.react-flow__edge-interaction'
    ).should('not.exist')

    // assert that edge exist
    cy.get(
      'div.react-flow__renderer > div > div > svg > g > g:nth-child(2) > path.react-flow__edge-interaction'
    ).should('exist')
  })
})
