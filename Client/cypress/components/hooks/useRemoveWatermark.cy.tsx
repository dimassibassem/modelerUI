import ReactFlow from 'reactflow'
import useRemoveWatermark from '@/hooks/useRemoveWatermark'

const Component = () => {
  useRemoveWatermark()
  return <ReactFlow />
}
describe('useRemoveWatermark', () => {
  it('should remove watermark', () => {
    cy.mount(<Component />)
    cy.get('div.react-flow__panel.react-flow__attribution.bottom.right')
      .should('not.exist')
  })
})
