import React from 'react'

type Props = {
    children: React.ReactNode;
}

const layout = (props: Props) => {
  return (
    <html>
        <body>
        {props.children}
        </body>
    </html>
  )
}

export default layout