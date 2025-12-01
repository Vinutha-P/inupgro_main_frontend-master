"use client"
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import AboutUsDetails from '@/components/pages/AboutUsDetails'


const page = () => {
  return (
    <div className=''>
      <Suspense fallback={"...LOADING"}>
        <Provider store={store}>
          <AboutUsDetails />
        </Provider>
      </Suspense>
    </div>
  )
}

export default page
