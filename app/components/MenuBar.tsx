import React from 'react'
import { Menu, MenuButton, MenuItem, MenuList, MenuListSlot, Tooltip } from '@mui/joy'

type Props = {}

const MenuBar = (props: Props) => {
  return (
    <Menu>
      <MenuButton />
      <MenuItem>Hi</MenuItem>
    </Menu>
  )
}

export default MenuBar;