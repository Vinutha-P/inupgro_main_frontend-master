'use client'
import TodayTopNewsPage from '@/components/pages/TodayTopNewsPage'
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { useParams } from 'next/navigation'

const page = () => {
  const params = useParams()
  const category = params.category;
  return (
    <div>
      <Suspense fallback={"Loading..."}>
        <Provider store={store} >
          <TodayTopNewsPage />
        </Provider>
      </Suspense>
    </div>
  )
}

export default page
