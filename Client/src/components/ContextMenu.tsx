import React from 'react'
import { Menu, Item, Separator, Submenu } from 'react-contexify'
import { handleItemClick } from '../utils/ContextMenu/handleContextMenu'
import ContextMenuItems from '../types/ContextMenuItems'

const ContextMenu = ({ MENU_ID }: { MENU_ID: string }) => (
    <Menu id={MENU_ID}>
      <Item id={ContextMenuItems.Copy} onClick={handleItemClick}>Copy</Item>
      <Item id={ContextMenuItems.Cut} onClick={handleItemClick}>Cut</Item>
      <Item id={ContextMenuItems.Paste} onClick={handleItemClick}>Paste</Item>
      <Item id={ContextMenuItems.CopyAsImage} onClick={handleItemClick}>Copy As Image</Item>
      <Separator />
      <Item id={ContextMenuItems.SelectNodes} onClick={handleItemClick}>Select Nodes</Item>
      <Item id={ContextMenuItems.SelectEdges} onClick={handleItemClick}>Select Edges</Item>
      <Item id={ContextMenuItems.SelectAll} onClick={handleItemClick}>Select all</Item>
      <Separator />
      <Item disabled>Disabled</Item>
      <Separator />
      <Submenu label='Foobar'>
        <Item id='reload' onClick={handleItemClick}>Reload</Item>
        <Item id='something' onClick={handleItemClick}>Do something else</Item>
      </Submenu>
    </Menu>
  )

export default ContextMenu
