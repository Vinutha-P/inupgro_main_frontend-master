"use client"
import CreateProfileForm from '@/components/organism/careersData/CareersForm'
import PublicPageTemplate from '@/components/templates/PublicPageTemplate'
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'




const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <div className='lg:hidden'>
          <PublicPageTemplate>
            <CreateProfileForm />
          </PublicPageTemplate>
        </div>
      </Provider>
    </Suspense>
  )
}

export default page