"use client"

import PublicPageTemplate from '@/components/templates/PublicPageTemplate'
import { store } from '@/lib/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import VideoPlayerPage from '../../../../../components/auth-pages/update-profile-details/teacher-videos/VideoPlayerPage'




const page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Provider store={store}>
                <PublicPageTemplate>
                    <VideoPlayerPage />
                </PublicPageTemplate>
            </Provider>
        </Suspense>
    )
}

export default page