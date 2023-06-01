import initWithAllNodes from '../support/initWithAllNodes'
import skipTutorial from '../support/skipTutorial'

describe('Keyboard Shortcuts', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#loading').should('exist')
    cy.get('#loading', { timeout: 10000 }).should('not.exist')
    skipTutorial()
    initWithAllNodes()
  })

  it('selects all nodes', () => {
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('a', { release: true })

    cy.get(
      '.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan'
    ).should('have.class', 'selected')

    // Random click to deselect all nodes
    cy.get('.react-flow__renderer > div').click('bottomLeft')

    cy.get(
      '.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-end.nopan'
    ).should('not.have.class', 'selected')
  })

  it('undo and redo', () => {
    let counter = 0
    // undo 3 times
    while (counter < 3) {
      cy.get('body').type('{ctrl}', { release: false })
      cy.get('body').type('z', { release: true })
      counter++
    }

    cy.get('.react-flow__renderer > div > div > div.react-flow__nodes')
      .children()
      .should('have.length', 3)

    // redo 3 times
    while (counter > 0) {
      cy.get('body').type('{ctrl}', { release: false })
      cy.get('body').type('y', { release: true })
      counter--
    }

    cy.get('.react-flow__renderer > div > div > div.react-flow__nodes')
      .children()
      .should('have.length', 6)
  })

  it('copy and paste', () => {
    cy.get('.react-flow__node-execution').realClick()
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('a', { release: true })

    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('c', { release: true })
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('v', { release: true })

    cy.get('div.z-10 > div > div').should('exist')
    cy.get('.react-flow__renderer > div').click('bottomLeft')

    cy.get('.react-flow__node-start')
      .realClick()
      .then(() => {
        cy.realPress('Backspace')
        cy.realPress('Backspace')
      })
    cy.get('.react-flow__node-end')
      .realClick()
      .then(() => {
        cy.realPress('Backspace')
      })

    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('a', { release: true })

    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('c', { release: true })
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('v', { release: true })

    cy.get('.react-flow__renderer > div > div > div.react-flow__nodes')
      .children()
      .should('have.length', 8)
  })

  it('cut and paste', () => {
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('a', { release: true })
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('x', { release: true })
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('v', { release: true })

    cy.get('.react-flow__renderer > div > div > div.react-flow__nodes')
      .children()
      .should('have.length', 6)
  })

  it('save', () => {
    cy.get('body').type('{ctrl}', { release: false })
    cy.get('body').type('s', { release: true })
    cy.get('div.z-10 > div > div').should('exist')
  })
})
