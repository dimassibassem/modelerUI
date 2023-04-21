const skipTutorial = () => {
  if (cy.get('.react-joyride__tooltip')) {
    cy.get('.react-joyride__tooltip').should('be.visible')
    cy.get(
      '#react-joyride-step-0 > div > div > div > div:nth-child(2) > div > button'
    ).click()
  }
}
export default skipTutorial
