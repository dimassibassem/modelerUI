import * as Chance from 'chance'

const chance = new Chance()

const initWithAllNodes = () => {
  cy.get(
    '#root > div > div:nth-child(2) > div > div.fixed.inset-0.z-10.overflow-y-auto > div > div > div'
  ).should('be.visible')
  cy.get('#name').type(chance.name())
  cy.get('#description').type(chance.sentence({ words: 5 }))
  cy.get(
    '#root > div > div:nth-child(2) > div > div.fixed.inset-0.z-10.overflow-y-auto > div > div > div > div.mt-5.sm\\:mt-6 > button'
  ).click()

  let padding = 0
  cy.get(
    '#root > div > div.min-h-0.flex-1.flex-col.border-r.border-gray-200.bg-white.max-w-\\[20\\%\\].hidden.lg\\:flex > div.flex.flex-1.flex-col.overflow-y-auto.pt-5.pb-4 > nav'
  )
    .children()
    .each((el, i) => {
      if (i !== 0) {
        padding += 100
        cy.dragAndDrop(el, padding)
      }
    })
}

export default initWithAllNodes
