import ProcessDefinition from '@/components/ProcessDefinition'

describe('<ProcessDefinition />', () => {
  it('renders', () => {
    const setOpen = cy.spy().as('setOpen')
    const open = true
    cy.mount(<ProcessDefinition open={open} setOpen={setOpen} />)
  })
})
