import { ButtonVariantProps } from '@/types/buttons.types'
import React from 'react'

const Pillbutton:React.FC<ButtonVariantProps> = ({buttonName,withBackground}) => {
  return (
    <button className={`h-[2.938rem] px-6 ${withBackground ? "text-white bg-primaryOverlay":"text-darkText"} `}>
      {buttonName}
    </button>
  )
}

export default Pillbutton
