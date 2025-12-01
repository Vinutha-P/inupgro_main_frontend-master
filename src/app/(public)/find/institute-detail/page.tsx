"use client"
import FindInstituteDetailPage from '@/components/pages/FindInstituteDetailPage'
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'

const page = () => {
  return (
    <div>
       <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
      <FindInstituteDetailPage/>
      </Provider>
      </Suspense>
    </div>
  )
}

export default page
