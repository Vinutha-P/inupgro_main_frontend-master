"use client"
import CareersDetails from '@/components/pages/CareersDetails'
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'



const page = () => {
  return (
    <div className=''>
      <Suspense fallback={"...LOADING"}>
        <Provider store={store}>
          <CareersDetails />
        </Provider>
      </Suspense>
    </div>
  )
}

export default page
