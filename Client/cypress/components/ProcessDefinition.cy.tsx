import ProcessDefinitionModal from '@/components/ProcessDefinitionModal'

describe('<ProcessDefinition />', () => {
  it('renders', () => {
    const setOpen = cy.spy().as('setOpen')
    const open = true
    cy.mount(<ProcessDefinitionModal open={open} setOpen={setOpen} />)
  })
})
