import * as Chance from 'chance'
import skipTutorial from '../support/skipTutorial'

const chance = new Chance()
describe('Basic Testing', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#loading').should('exist')
    cy.get('#loading', { timeout: 10000 }).should('not.exist')
    skipTutorial()
  })

  it('renders the process Modal', () => {
    cy.get('#process-modal').should('be.visible')
  })

  it('renders process Name and description in left Sidebar after submitting', () => {
    const name = chance.name()
    const description = chance.sentence({ words: 5 })

    cy.get('#process-modal').should('be.visible')
    cy.get('#name').type(name)
    cy.get('#description').type(description)
cy.get('#process-modal > div > button').click()
    cy.get(
      '#right-sidebar > div'
    ).should('contain', name)
    cy.get(
      '#right-sidebar > div:nth-child(2)'
    ).should('contain', description)
  })
})

export {}
