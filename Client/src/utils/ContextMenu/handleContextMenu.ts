import { ItemParams } from 'react-contexify'
import { MouseEvent } from 'react'
import { Edge, Node, ReactFlowInstance } from 'reactflow'
import copyAsImage from './copyAsImage'
import selectNodes from './selectNodes'
import selectEdges from './selectEdges'

export const handleItemClick = async ({
                                        id,
                                        event,
                                        props
                                      }: ItemParams) => {
  switch (id) {
    case 'copy': {
      const nodes = props.reactFlowInstance?.getNodes()
      const edges = props.reactFlowInstance?.getEdges()
      const selectedNodes = nodes?.filter((node: Node) => node.selected)
      const selectedEdges = edges?.filter((edge: Edge) => edge.selected)
      props.setLastNodeId(props.lastNodeId + selectedNodes.length)
      const data = {
        nodes: selectedNodes,
        edges: selectedEdges
      }
      const json = JSON.stringify(data)
      props.copy(json)
      break
    }
    case 'paste': {
      const json = await navigator.clipboard.readText()
      const data = JSON.parse(json)
      const clickedPosition = props.reactFlowInstance?.project({
        x: (event as MouseEvent).screenX,
        y: (event as MouseEvent).screenY
      })
      const copiedEdgesWithNewIds = data.edges.map((edge: Edge) => {
        const sourceSeparatorIndex = edge.source.indexOf('_') + 1// Get the index of the separator character
        const sourceNumberId = parseInt(edge.source.substring(sourceSeparatorIndex, edge.source.length), 10)// Get the number of the ID after the separator
        const sourceIdSuffix = edge.source.substring(sourceSeparatorIndex) // Get the suffix of the ID after the separator
        const newSourceIdSuffix = (sourceNumberId + props.lastNodeId).toString().padStart(sourceIdSuffix.length, '0')// Append the incremented value to the suffix
        const newSource = `${edge.source.substring(0, sourceSeparatorIndex)}${newSourceIdSuffix}`
        const targetSeparatorIndex = edge.target.indexOf('_') + 1// Get the index of the separator character
        const targetNumberId = parseInt(edge.target.substring(targetSeparatorIndex, edge.target.length), 10)// Get the number of the ID after the separator
        const targetIdSuffix = edge.target.substring(targetSeparatorIndex) // Get the suffix of the ID after the separator
        const newTargetIdSuffix = (targetNumberId + props.lastNodeId).toString().padStart(targetIdSuffix.length, '0')// Append the incremented value to the suffix
        const newTarget = `${edge.target.substring(0, targetSeparatorIndex)}${newTargetIdSuffix}`
        const newId = `${newSource}-from-${edge.sourceHandle}-to-${newTarget}-from-${edge.targetHandle}`
        return ({
          ...edge,
          source: newSource,
          target: newTarget,
          id: newId
        })
      })
      const copiedNodesWithNewIds = data.nodes.map((node: Node) => {
        const separatorIndex = node.id.indexOf('_') + 1// Get the index of the separator character
        const numberId = parseInt(node.id.substring(separatorIndex, node.id.length), 10)// Get the number of the ID after the separator
        const idSuffix = node.id.substring(separatorIndex) // Get the suffix of the ID after the separator
        const newIdSuffix = (numberId + props.lastNodeId).toString().padStart(idSuffix.length, '0')// Append the incremented value to the suffix
        const newId = `${node.id.substring(0, separatorIndex)}${newIdSuffix}`
        return ({
          ...node,
          id: newId,
          position: { x: clickedPosition.x + node.position.x - 250, y: clickedPosition.y + node.position.y - 250 }
        })
      })
      const nodes = props.reactFlowInstance?.getNodes()
      const edges = props.reactFlowInstance?.getEdges()
      props.reactFlowInstance?.setNodes([...nodes, ...copiedNodesWithNewIds])
      props.reactFlowInstance?.setEdges([...edges, ...copiedEdgesWithNewIds])
      props.setLastNodeId(props.lastNodeId + copiedNodesWithNewIds.length)
      break
    }
    case 'cut':
      console.log(event, props)
      break
    case 'copyAsImage': {
      await copyAsImage(props.reactFlowInstance, props.setOpenNotification)
      break
    }
    case 'selectNodes': {
      selectNodes(props.reactFlowInstance)
      break
    }
    case 'selectEdges': {
      selectEdges(props.reactFlowInstance)
      break
    }
    case 'selectAll': {
      selectNodes(props.reactFlowInstance)
      selectEdges(props.reactFlowInstance)
      break
    }
    default:
  }
}

export const handleContextMenu = (event: MouseEvent,
                                  reactFlowInstance: ReactFlowInstance | null,
                                  show: (params: {
                                    event: MouseEvent, props: { [key: string]: any }
                                  }) => void,
                                  copy: (text: string) => Promise<boolean>,
                                  setOpenNotification: (open: boolean) => void,
                                  lastNodeId: number,
                                  setLastNodeId: (id: number) => void
) => {
  show({
    event,
    props: {
      key: 'value',
      reactFlowInstance,
      copy,
      setOpenNotification,
      lastNodeId,
      setLastNodeId
    }
  })
}
