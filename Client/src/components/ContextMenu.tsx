import React from 'react'
import { Menu, Item, Separator, Submenu } from 'react-contexify'
import { handleItemClick } from '../utils/handleContextMenu'

const ContextMenu = ({ MENU_ID }: { MENU_ID: string }) => (
    <Menu id={MENU_ID}>
      <Item id='copy' onClick={handleItemClick}>Copy</Item>
      <Item id='cut' onClick={handleItemClick}>Cut</Item>
      <Item id='copyAsImage' onClick={handleItemClick}>Copy As Image</Item>
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
