import { ItemParams } from 'react-contexify'
import { MouseEvent } from 'react'
import { Node, Edge, ReactFlowInstance } from 'reactflow'
import copyAsImage from './copyAsImage'
import selectNodes from './selectNodes'
import selectEdges from './selectEdges'
import copySelected from './copySelected'
import pasteFromClipboard from './pasteFromClipboard'
import ContextMenuItem from '@/types/ContextMenuItem'
import cutSelected from './cutSelected'
import selectAll from '@/utils/Flow/selectAll'

export const handleItemClick = async ({ id, props }: ItemParams) => {
  switch (id as ContextMenuItem) {
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
      await pasteFromClipboard(props)
      break
    }
    case ContextMenuItem.Cut:
      await cutSelected(
        props.reactFlowInstance,
        props.setNodes,
        props.setEdges,
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
      selectNodes(props.reactFlowInstance)
      break
    }
    case ContextMenuItem.SelectEdges: {
      selectEdges(props.reactFlowInstance)
      break
    }
    case ContextMenuItem.SelectAll: {
      selectAll(
        props.reactFlowInstance,
        props.setNodes,
        props.setEdges,
        props.pause,
        props.resume
      )
      break
    }
    default:
  }
}

export const handleContextMenu = (
  event: MouseEvent,
  props: {
    reactFlowInstance: ReactFlowInstance | null
    setNodes: (nodes: Node[]) => void
    setEdges: (edges: Edge[]) => void
    show: (params: {
      event: MouseEvent
      props: { [key: string]: unknown }
    }) => void
    copy: (text: string) => Promise<boolean>
    setOpenNotification: (open: boolean) => void
    lastNodeIdNumber: number
    setLastNodeIdNumber: (id: number) => void
    setNotificationData: (data: { success: boolean; message: string }) => void
    resume: () => void
    pause: () => void
  }
) => {
  props.show({
    event,
    props: {
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
