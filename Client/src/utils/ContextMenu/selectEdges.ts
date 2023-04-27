import { Edge } from 'reactflow'

const selectEdges = (
  edges: Edge[],
  setEdges: (edges: Edge[]) => void
) => {
  if (edges) {
    setEdges(
      edges.map((edge) => ({
        ...edge,
        selected: true
      }))
    )
  }
}
export default selectEdges
