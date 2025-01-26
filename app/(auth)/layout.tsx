import React from 'react'
import Image from 'next/image'
// import {image} from '@public/auth-image.jpg'

type Props = {
    children: React.ReactNode;
}

const layout = (props: Props) => {
  return (
    <html>
        <body>
          <div className='flex flex-row justify-center items-center h-screen w-screen'>
            <div className='h-screen w-[50%] bg-blue-200 hidden lg:flex'>
              <Image src={'/auth-image.jpg'} alt='auth-image' width={1000} height={1000} className='h-full object-cover' />
            </div>
            {props.children}
          </div>
        </body>
    </html>
  )
}

export default layout