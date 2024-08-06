import { HourglassBottomRounded, Looks } from '@mui/icons-material'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex flex-col h-full w-[70vw] items-center justify-center'>
      <HourglassBottomRounded sx={{ fontSize: 60 }} />
      <p className='text-2xl text-neutral-500'>Coming Soon...</p>
    </div>
  )
}

export default page