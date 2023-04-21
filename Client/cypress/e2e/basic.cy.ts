import * as Chance from 'chance'
import skipTutorial from '../support/skipTutorial'

const chance = new Chance()
describe('Basic Testing', () => {
  beforeEach(() => {
    cy.visit('/')
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
      '#right-sidebar > div.flex.flex-nowrap.justify-center.text-md.font-medium.leading-6.text-gray-900.sm\\:pt-1\\.5.items-center.truncate.outline-none.focus\\:outline-none'
    ).should('contain', name)
    cy.get(
      '#right-sidebar > div.flex.flex-nowrap.justify-center.text-sm.font-small.leading-6.text-gray-600.sm\\:pt-1\\.5.items-center.truncate.outline-none.focus\\:outline-none'
    ).should('contain', description)
  })
})

export {}
