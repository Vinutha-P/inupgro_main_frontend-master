"use client"
import { store } from '@/lib/store'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
const FindSchoolDetailPage = dynamic(() => import('@/components/pages/FindSchoolDetailPage'), {
  ssr: false
});



const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <FindSchoolDetailPage />
      </Provider>
    </Suspense>
  )
}

export default page