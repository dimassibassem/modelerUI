import * as Chance from 'chance'

const chance = new Chance()

const initWithAllNodes = () => {
  cy.get('#process-modal').should('be.visible')
  cy.get('#name').type(chance.name())
  cy.get('#description').type(chance.sentence({ words: 5 }))
  cy.get('#process-modal > div > button').click()

  let padding = 0
  cy.get(
    '#left-sidebar > div.flex.flex-1.flex-col > nav > div'
  )
    .children()
    .each((el, i) => {
      padding += 100
      cy.dragAndDrop(el, padding)
    })
}

export default initWithAllNodes
