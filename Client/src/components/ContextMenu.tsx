import React from 'react'
import { Menu, Item, Separator } from 'react-contexify'
import { Node } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import { handleItemClick } from '@/utils/ContextMenu/handleContextMenu'
import ContextMenuItem from '@/types/enums/ContextMenuItem'
import { RFState } from '@/types/store/RFState'
import { useFlowStore } from '@/store'
import State from '@/types/store/State'
import useStore from '@/store/stateStore'

const handleDisable = (selectedNodes: Node[] | undefined) =>
  !(selectedNodes && selectedNodes.length > 0)
const selector = (state: RFState) => ({
  nodes: state.nodes
})
const selector2 = (state: State) => ({
  menuID: state.menuID
})
const ContextMenu = () => {
  const { t } = useTranslation()
  const { nodes } = useFlowStore(selector, shallow)
  const { menuID } = useStore(selector2, shallow)
  return (
    <Menu id={menuID}>
      <Item
        id={ContextMenuItem.Copy}
        disabled={handleDisable(nodes?.filter((node) => node.selected))}
        onClick={handleItemClick}
      >
        {t('Copy')}
      </Item>
      <Item
        id={ContextMenuItem.Cut}
        disabled={handleDisable(nodes?.filter((node) => node.selected))}
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
