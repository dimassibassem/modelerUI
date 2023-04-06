import '@4tw/cypress-drag-drop'

Cypress.Commands.add('dragPane', ({ from, to }) =>
  cy
    .window()
    .then((window) =>
      cy
        .get('.react-flow__pane')
        .trigger('mousedown', from.x, from.y, { view: window })
        .trigger('mousemove', to.x, to.y)
        .trigger('mouseup', { force: true, view: window })
    )
)

Cypress.Commands.add('zoomPane', (wheelDelta: number) =>
  cy.get('.react-flow__pane').trigger('wheel', 'center', { deltaY: wheelDelta }).wait(250)
)

Cypress.Commands.add('isWithinViewport', { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect()

  return cy.window().then((window) => {
    expect(rect.top).to.be.within(0, window.innerHeight)
    expect(rect.right).to.be.within(0, window.innerWidth)
    expect(rect.bottom).to.be.within(0, window.innerHeight)
    expect(rect.left).to.be.within(0, window.innerWidth)

    return subject
  })
})

Cypress.Commands.add('isOutsideViewport', { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect()

  return cy.window().then((window) => {
    // eslint-disable-next-line no-unused-expressions
    expect(window.innerHeight < rect.top || rect.bottom < 0 || window.innerWidth < rect.left || rect.right < 0).to.be
      .true

    return subject
  })
})

let nodePositionPadding = 0

Cypress.Commands.add('dragAndDrop', (el) => {
  const dataTransfer = new DataTransfer()
  // @ts-ignore
  cy.get(el).trigger('dragstart', { dataTransfer })
  nodePositionPadding += 100
  cy.get('#root > div > div.grow.h-full > div > div.react-flow__renderer > div')
    .trigger('drop', { dataTransfer, clientX: 100 + nodePositionPadding, clientY: 100 + nodePositionPadding })
})

export {}