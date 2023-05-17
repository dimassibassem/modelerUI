import initWithAllNodes from '../support/initWithAllNodes'
import skipTutorial from "../support/skipTutorial";

describe('Context Menu', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#loading').should('exist')
    cy.get('#loading', { timeout: 10000 }).should('not.exist')
    skipTutorial()
    initWithAllNodes()
  })

  it('opens context menu', () => {
    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div'
    ).rightclick()

    cy.get('.contexify').should('be.visible')
  })

  it('selects all nodes', () => {
    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div'
    ).rightclick()

    cy.get('.contexify').children().eq(5).click()

    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes'
    )
      .children()
      .should('have.class', 'selected')
  })

  it('selects all edges', () => {
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

    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div'
    ).rightclick()

    cy.get('.contexify').children().eq(6).click()

    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > svg > g'
    )
      .children()
      .should('have.class', 'selected')
  })
})
