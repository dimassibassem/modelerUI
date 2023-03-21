import React from 'react'
import { Menu, Item, Separator, Submenu } from 'react-contexify'
import { handleItemClick } from '../utils/ContextMenu/handleContextMenu'

const ContextMenu = ({ MENU_ID }: { MENU_ID: string }) => (
    <Menu id={MENU_ID}>
      <Item id='copy' onClick={handleItemClick}>Copy</Item>
      <Item id='cut' onClick={handleItemClick}>Cut</Item>
      <Item id='paste' onClick={handleItemClick}>Paste</Item>
      <Item id='copyAsImage' onClick={handleItemClick}>Copy As Image</Item>
      <Separator />
      <Item id='selectNodes' onClick={handleItemClick}>Select Nodes</Item>
      <Item id='selectEdges' onClick={handleItemClick}>Select Edges</Item>
      <Item id='selectAll' onClick={handleItemClick}>Select all</Item>
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
