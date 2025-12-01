"use client"
import CareersRightSide from '@/components/organism/careersData/CareersRightSide'
import PublicPageTemplate from '@/components/templates/PublicPageTemplate'
import { store } from '@/lib/store'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'


const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <div className='lg:hidden'>
          <PublicPageTemplate>
            <CareersRightSide />
          </PublicPageTemplate>
        </div>
      </Provider>
    </Suspense>
  )
}

export default page