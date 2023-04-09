import { Edge, Node } from 'reactflow'

type Graph = Record<string, string[]>

function createGraph(nodes: Node[], edges: Edge[]): Graph {
  const graph: Graph = {}

  // Add nodes to the graph
  for (const node of nodes) {
    graph[node.id] = []
  }

  // Add edges to the graph
  for (const edge of edges) {
    graph[edge.source].push(edge.target)
  }

  return graph
}

function findAllPaths(
  graph: Graph,
  start: string,
  end: string,
  visited: Map<string, number> = new Map(),
  path: string[] = []
): string[][] {
  // Add current node to path
  path.push(start)

  // Mark current node as visited and on path
  visited.set(start, (visited.get(start) || 0) + 1)

  // Initialize result
  const result: string[][] = []

  // Check if we reached the end
  if (start === end) {
    result.push([...path])
  } else {
    // Recursively search all neighbors
    for (const neighbor of graph[start]) {
      // Ignore neighbors that have been visited twice
      if (
        visited.get(neighbor) !== 2 ||
        (neighbor === end && visited.get(start) !== 2)
      ) {
        result.push(...findAllPaths(graph, neighbor, end, visited, path))
      }
    }
  }

  // Remove current node from path and mark as not on path
  path.pop()
  visited.set(start, visited.get(start)! - 1)

  // Clean up visited map
  if (visited.get(start) === 0) {
    visited.delete(start)
  }

  return result
}

export { createGraph, findAllPaths }
