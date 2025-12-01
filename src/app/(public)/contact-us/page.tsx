"use client"
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import ContactUs from '@/components/pages/ContactUs'


const page = () => {
  return (
    <div className=''>
      <Suspense fallback={"...LOADING"}>
        <Provider store={store}>
          <ContactUs />
        </Provider>
      </Suspense>
    </div>
  )
}

export default page
