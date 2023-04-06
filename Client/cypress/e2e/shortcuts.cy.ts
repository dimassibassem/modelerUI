import initWithAllNodes from '../support/initWithAllNodes'

describe('Keyboard Shortcuts', () => {

  beforeEach(() => {
    cy.visit('/')
    initWithAllNodes()
  })

  it('selects all nodes', () => {
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('a', { release: true })

    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan')
      .should('have.class', 'selected')

    // Random click to deselect all nodes
    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div')
      .click('bottomLeft')

    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan')
      .should('not.have.class', 'selected')

  })


  it('undo and redo', () => {
    let counter = 0
    // undo 3 times
    while (counter < 3) {
      cy.get('body').type('{ctrl}', { release: false })
      cy.get('body').type('z', { release: true })
      counter++
    }

    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes')
      .children()
      .should('have.length', 3)

    // redo 3 times
    while (counter > 0) {
      cy.get('body').type('{ctrl}', { release: false })
      cy.get('body').type('y', { release: true })
      counter--
    }

    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes')
      .children()
      .should('have.length', 6)

  })

  it('copy and paste', () => {
cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('a', { release: true })
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('c', { release: true })
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('v', { release: true })

    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes')
      .children()
      .should('have.length', 12)
  })

  it('cut and paste', () => {
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('a', { release: true })
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('x', { release: true })
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('v', { release: true })

    cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div > div > div.react-flow__nodes')
      .children()
      .should('have.length', 6)
  })


})
