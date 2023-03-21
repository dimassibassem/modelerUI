import { ItemParams } from 'react-contexify'
import { MouseEvent } from 'react'
import { ReactFlowInstance } from 'reactflow'
import copyAsImage from './copyAsImage'
import selectNodes from './selectNodes'
import selectEdges from './selectEdges'
import copySelected from './copySelected'
import pasteFromClipboard from './pasteFromClipboard'
import ContextMenuItems from '../../types/ContextMenuItems'
import cutSelected from './cutSelected'

export const handleItemClick = async ({
                                        id,
                                        event,
                                        props
                                      }: ItemParams) => {
  switch (id as ContextMenuItems) {
    case ContextMenuItems.Copy: {
      await copySelected(props.reactFlowInstance, props.lastNodeId, props.setLastNodeId, props.copy)
      break
    }
    case ContextMenuItems.Paste: {
      await pasteFromClipboard(props.reactFlowInstance, props.lastNodeId, props.setLastNodeId, props.setNotificationData, props.setOpenNotification, event)
      break
    }
    case ContextMenuItems.Cut:
      await cutSelected(props.reactFlowInstance, props.lastNodeId, props.setLastNodeId, props.copy)
      break
    case ContextMenuItems.CopyAsImage: {
      await copyAsImage(props.reactFlowInstance, props.setOpenNotification, props.setNotificationData)
      break
    }
    case ContextMenuItems.SelectNodes: {
      selectNodes(props.reactFlowInstance)
      break
    }
    case ContextMenuItems.SelectEdges: {
      selectEdges(props.reactFlowInstance)
      break
    }
    case ContextMenuItems.SelectAll: {
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
                                    event: MouseEvent, props: { [key: string]: unknown }
                                  }) => void,
                                  copy: (text: string) => Promise<boolean>,
                                  setOpenNotification: (open: boolean) => void,
                                  lastNodeId: number,
                                  setLastNodeId: (id: number) => void,
                                  setNotificationData: (data: { success: boolean, message: string }) => void) => {
  show({
    event,
    props: {
      key: 'value',
      reactFlowInstance,
      copy,
      setOpenNotification,
      lastNodeId,
      setLastNodeId,
      setNotificationData
    }
  })
}
