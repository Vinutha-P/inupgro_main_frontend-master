"use client"


import React, { Suspense } from 'react'
import UpdateStudentProfileDetails from '@/components/auth-pages/update-profile-details/UpdateStudentProfileDetails'
import PublicPageTemplate from '@/components/templates/PublicPageTemplate'
import { store } from '@/lib/store'
import { Provider } from 'react-redux'




const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <PublicPageTemplate>
          <UpdateStudentProfileDetails />
        </PublicPageTemplate>
      </Provider>
    </Suspense>
  )
}

export default page