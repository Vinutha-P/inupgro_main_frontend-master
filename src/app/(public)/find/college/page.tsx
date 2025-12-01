"use client"
import React from 'react'
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import FindCollegePage from '@/components/pages/FindCollegePage';
const page = () => {
    return (
        <Provider store={store}>
            <FindCollegePage />
        </Provider>
    )
}

export default page
