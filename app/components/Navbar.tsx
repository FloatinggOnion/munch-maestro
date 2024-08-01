import React from 'react'

import {  } from '@mui/joy'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='bg-blue-200/60 fixed w-full backdrop-blur-sm py-3 px-12'>
        <h1 className='text-zinc-700 text-2xl font-extrabold'>PanTrack</h1>
    </nav>
  )
}

export default Navbar