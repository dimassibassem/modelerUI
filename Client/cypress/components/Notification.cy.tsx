import Notification from '@/components/Modals/Notification'

describe('<Notification />', () => {
  it('renders', () => {
    const setOpen = cy.spy().as('setOpen')
    const open = true
    const data = {
      success: true,
      message: 'Test message'
    }

    cy.mount(<Notification open={open} setOpen={setOpen} data={data} />)
  })
})
