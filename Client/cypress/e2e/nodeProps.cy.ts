import initWithAllNodes from "../support/initWithAllNodes";
import skipTutorial from "../support/skipTutorial";

beforeEach(() => {
    cy.visit('/')
  })

  describe('click a node', () => {
    it('should show the node details', () => {
      skipTutorial()
      initWithAllNodes()
      cy.get('#reactflow-wrapper > div > div.react-flow__renderer > div > div > div.react-flow__nodes > div.react-flow__node.react-flow__node-policies.nopan.selectable > div > div:nth-child(1) > img')
        .realClick()
      cy.get('#right-sidebar').should('exist')
    })
  })
