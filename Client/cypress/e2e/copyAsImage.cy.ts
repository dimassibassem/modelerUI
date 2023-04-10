import initWithAllNodes from '../support/initWithAllNodes'

describe('copyAsImage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should copy the image to the clipboard and show a success notification', () => {
    initWithAllNodes()

    cy.get(
      '#root > div > div.grow.h-full > div > div.react-flow__renderer > div'
    ).rightclick()

    cy.get('.contexify').children().eq(3).click()

    cy.get(
      '#root > div > div.z-10.pointer-events-none.fixed.inset-0.flex.items-end.px-4.py-6.sm\\:items-start.sm\\:p-6 > div > div > div'
    ).should('be.visible')

    cy.get('div > div > div > div.ml-3.w-0.flex-1.pt-0\\.5 > p').should(
      'have.text',
      'Image copied to clipboard'
    )
  })
})
