import { ItemParams } from 'react-contexify'
import { MouseEvent } from 'react'
import copyAsImage from './copyAsImage'
import copySelected from './copySelected'
import pasteFromClipboard from './pasteFromClipboard'
import ContextMenuItem from '@/types/ContextMenuItem'
import cutSelected from './cutSelected'
import ContextMenuItemProps from '@/types/ContextMenuItemProps'

export const handleItemClick = async ({ id, props }: ItemParams) => {
  switch (id) {
    case ContextMenuItem.Copy: {
      await copySelected(
        props.reactFlowInstance,
        props.lastNodeId,
        props.setLastNodeId,
        props.copy
      )
      break
    }
    case ContextMenuItem.Paste: {
      await pasteFromClipboard(
        props.nodes,
        props.edges,
        props.setNodesAndEdges,
        props.lastNodeIdNumber,
        props.setLastNodeIdNumber,
        props.setOpenNotification,
        props.setNotificationData
      )
      break
    }
    case ContextMenuItem.Cut:
      await cutSelected(
        props.nodes,
        props.edges,
        props.setNodesAndEdges,
        props.lastNodeId,
        props.setLastNodeId,
        props.copy
      )
      break
    case ContextMenuItem.CopyAsImage: {
      await copyAsImage(
        props.reactFlowInstance,
        props.setOpenNotification,
        props.setNotificationData
      )
      break
    }
    case ContextMenuItem.SelectNodes: {
      props.selectAllNodes()
      break
    }
    case ContextMenuItem.SelectEdges: {
      props.selectAllEdges()
      break
    }
    case ContextMenuItem.SelectAll: {
      props.selectAll()
      break
    }
    default:
  }
}

export const handleContextMenu = (
  event: MouseEvent,
  props: ContextMenuItemProps
) => {
  props.show({
    event,
    props: {
      selectAllNodes: props.selectAllNodes,
      selectAllEdges: props.selectAllEdges,
      selectAll: props.selectAll,
      reactFlowInstance: props.reactFlowInstance,
      setNodes: props.setNodes,
      setEdges: props.setEdges,
      copy: props.copy,
      setOpenNotification: props.setOpenNotification,
      lastNodeId: props.lastNodeIdNumber,
      setLastNodeId: props.setLastNodeIdNumber,
      setNotificationData: props.setNotificationData,
      resume: props.resume,
      pause: props.pause
    }
  })
}
