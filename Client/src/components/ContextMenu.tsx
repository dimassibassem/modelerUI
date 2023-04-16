import React from 'react'
import { Menu, Item, Separator } from 'react-contexify'
import { Node } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import { handleItemClick } from '@/utils/ContextMenu/handleContextMenu'
import ContextMenuItem from '@/types/ContextMenuItem'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const handleDisable = (selectedNodes: Node[] | undefined) =>
  !(selectedNodes && selectedNodes.length > 0)
const selector = (state: RFState) => ({
  nodes: state.nodes
})
const ContextMenu = ({ MENU_ID }: { MENU_ID: string }) => {
  const { t } = useTranslation()
  const { nodes } = useFlowStore(selector, shallow)
  return (
    <Menu id={MENU_ID}>
      <Item
        id={ContextMenuItem.Copy}
        disabled={handleDisable(nodes?.filter((node: Node) => node.selected))}
        onClick={handleItemClick}
      >
        {t('Copy')}
      </Item>
      <Item
        id={ContextMenuItem.Cut}
        disabled={handleDisable(nodes?.filter((node: Node) => node.selected))}
        onClick={handleItemClick}
      >
        {t('Cut')}
      </Item>
      <Item id={ContextMenuItem.Paste} onClick={handleItemClick}>
        {t('Paste')}
      </Item>
      <Item id={ContextMenuItem.CopyAsImage} onClick={handleItemClick}>
        {t('Copy as image')}
      </Item>
      <Separator />
      <Item id={ContextMenuItem.SelectNodes} onClick={handleItemClick}>
        {t('Select nodes')}
      </Item>
      <Item id={ContextMenuItem.SelectEdges} onClick={handleItemClick}>
        {t('Select edges')}
      </Item>
      <Item id={ContextMenuItem.SelectAll} onClick={handleItemClick}>
        {t('Select all')}
      </Item>
      <Separator />
    </Menu>
  )
}

export default ContextMenu
