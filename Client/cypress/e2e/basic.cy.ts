import * as Chance from 'chance'

const chance = new Chance()
describe('Basic Testing', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the process Modal', () => {
    cy.get('#root > div > div:nth-child(2) > div > div.fixed.inset-0.z-10.overflow-y-auto > div > div > div')
      .should('be.visible')
  })

  it('renders process Name and description in left Sidebar after submitting', () => {

    const name = chance.name()
    const description = chance.sentence({ words: 5 })

    cy.get('#root > div > div:nth-child(2) > div > div.fixed.inset-0.z-10.overflow-y-auto > div > div > div')
      .should('be.visible')
    cy.get('#name')
      .type(name)
    cy.get('#description')
      .type(description)
    cy.get('#root > div > div:nth-child(2) > div > div.fixed.inset-0.z-10.overflow-y-auto > div > div > div > div.mt-5.sm\\:mt-6 > button')
      .click()

    cy.get('#root > div > aside > div.flex.flex-nowrap.justify-center.text-md.font-medium.leading-6.text-gray-900.sm\\:pt-1\\.5.items-center.truncate.outline-none.focus\\:outline-none')
      .should('contain', name)
    cy.get('#root > div > aside > div.flex.flex-nowrap.justify-center.text-sm.font-small.leading-6.text-gray-600.sm\\:pt-1\\.5.items-center.truncate.outline-none.focus\\:outline-none')
      .should('contain', description)
  })
})

export {}
