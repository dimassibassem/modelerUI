import initWithAllNodes from '../support/initWithAllNodes'
import skipTutorial from '../support/skipTutorial'

describe('Valid steps in Sidebar', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#loading').should('exist')
    cy.get('#loading', { timeout: 10000 }).should('not.exist')
    skipTutorial()
  })

  it('Should render valid steps in sidebar', () => {
    initWithAllNodes()

    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    // assert that the edge is visible
    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g > g:nth-child(1) > path.react-flow__edge-interaction'
    ).should('be.visible')

    // assert shown steps in sidebar without cycle
    cy.get('#root > div > aside > div:nth-child(6)').should('be.visible')

    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-right.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-execution.nopan.selectable > div > div.react-flow__handle.react-flow__handle-top.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    // assert that the edge is visible
    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g > g:nth-child(3) > path.react-flow__edge-interaction'
    )

    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-execution.nopan.selectable > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-bottom.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    // assert that edge is visible
    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g > g:nth-child(4) > path.react-flow__edge-interaction'
    )

    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div.react-flow__handle.react-flow__handle-left.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    ).drag(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan.selectable > div > div.react-flow__handle.react-flow__handle-right.nodrag.nopan.source.connectable.connectablestart.connectableend.connectionindicator'
    )

    // assert that edge is visible
    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g > g:nth-child(5) > path.react-flow__edge-interaction'
    )

    // assert shown steps in sidebar with cycle
    // scroll to bottom of sidebar
    // cy.get('#right-sidebar > div:nth-child(6) > div > ul > li > div > div').scrollIntoView()

    cy.get(
      '#right-sidebar > div:nth-child(6) > div > ul > li > div > div'
    ).should('be.visible')

    cy.get('#right-sidebar > div:nth-child(6) > div > ul > li > div').should(
      'be.visible'
    )
  })
})
