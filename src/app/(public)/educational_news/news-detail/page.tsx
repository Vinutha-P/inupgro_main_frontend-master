'use client'
import NewsDetailPage from '@/components/pages/NewsDetailPage'
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'

const page = () => {
  return (
    <div>
      <Suspense fallback={"Loading..."}>
        <Provider store={store}>
          <NewsDetailPage />
        </Provider>
      </Suspense>
    </div>
  )
}

export default page
