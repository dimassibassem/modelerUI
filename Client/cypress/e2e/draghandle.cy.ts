import initWithAllNodes from '../support/initWithAllNodes'
import skipTutorial from "../support/skipTutorial";

describe('Drag And Drop Handle Rendering', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#loading').should('exist')
    cy.get('#loading', { timeout: 10000 }).should('not.exist')
    skipTutorial()
  })

  it('drag and drop nodes to the flow', () => {
    initWithAllNodes()
    cy.dragPane({ from: { x: 100, y: 200 }, to: { x: 10, y: 0 } })
    cy.zoomPane(20)
  })
})
export {}
