import React from 'react'
import { Menu, Item, Separator } from 'react-contexify'
import { Node } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { handleItemClick } from '@/utils/ContextMenu/handleContextMenu'
import ContextMenuItems from '@/types/ContextMenuItems'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const handleDisable = (selectedNodes: Node[] | undefined) =>
  !(selectedNodes && selectedNodes.length > 0)
const selector = (state: RFState) => ({
  nodes: state.nodes
})
const ContextMenu = ({ MENU_ID }: { MENU_ID: string }) => {
  const { nodes } = useFlowStore(selector, shallow)
  return (
    <Menu id={MENU_ID}>
      <Item
        id={ContextMenuItems.Copy}
        disabled={handleDisable(nodes?.filter((node: Node) => node.selected))}
        onClick={handleItemClick}
      >
        Copy
      </Item>
      <Item
        id={ContextMenuItems.Cut}
        disabled={handleDisable(nodes?.filter((node: Node) => node.selected))}
        onClick={handleItemClick}
      >
        Cut
      </Item>
      <Item id={ContextMenuItems.Paste} onClick={handleItemClick}>
        Paste
      </Item>
      <Item id={ContextMenuItems.CopyAsImage} onClick={handleItemClick}>
        Copy As Image
      </Item>
      <Separator />
      <Item id={ContextMenuItems.SelectNodes} onClick={handleItemClick}>
        Select Nodes
      </Item>
      <Item id={ContextMenuItems.SelectEdges} onClick={handleItemClick}>
        Select Edges
      </Item>
      <Item id={ContextMenuItems.SelectAll} onClick={handleItemClick}>
        Select all
      </Item>
      <Separator />
    </Menu>
  )
}

export default ContextMenu
