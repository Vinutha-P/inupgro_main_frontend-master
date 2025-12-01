"use client"
import FindCollegeDetailsPage from '@/components/pages/FindCollegeDetailsPage'
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'

const page = () => {
  return (
    <div className=''>
      <Suspense fallback={"...LOADING"}>
      <Provider store={store}>
        <FindCollegeDetailsPage />
      </Provider>
      </Suspense>
    </div>
  )
}

export default page
