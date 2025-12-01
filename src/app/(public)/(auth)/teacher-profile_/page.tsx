"use client"

import TeacherProfileDetails from '@/components/auth-pages/teachers-profile-details/TeachersProfileDetails'
import ProfilePageTemplate from '@/components/templates-profile-page/ProfilePageTemplate'
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'




const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <ProfilePageTemplate>
          <TeacherProfileDetails />
        </ProfilePageTemplate>
      </Provider>
    </Suspense>
  )
}

export default page