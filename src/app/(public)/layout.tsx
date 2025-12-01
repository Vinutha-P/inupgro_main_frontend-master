import React from 'react'
interface layoutProps {
  children:React.ReactNode;
}

const layout:React.FC<layoutProps> = ({children}) => {
  return (
    <div className=''>
      {children}
    </div>
  )
}

export default layout
