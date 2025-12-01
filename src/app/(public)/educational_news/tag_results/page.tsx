'use client'
import TagResultsPage from '@/components/pages/TagResultsPage'
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'

const page = () => {
  return (
    <div>
      <Suspense fallback={"Loading..."}>
        <Provider store={store} >
          <TagResultsPage />
        </Provider>
      </Suspense>
    </div>
  )
}

export default page
