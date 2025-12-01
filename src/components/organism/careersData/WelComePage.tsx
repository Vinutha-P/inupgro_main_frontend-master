import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const WelComePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <div className='max-w-[780px] mx-auto text-center'>
                <Image
                    src="/welcome.png"
                    alt="A scenic view"
                    width={320}
                    height={310}
                    className='mx-auto'
                />
                <p className='mt-11'>
                Welcome, <strong> {user?.firstName},</strong> to <strong> INUPGROW.</strong> Your profile has been created successfully. You can now easily apply to any school on our platform. A new password has been sent to <strong>{user?.email}</strong> You can <Link className='text-primaryLight font-bold' href="#"> change password</Link> in your profile settings.
                </p>
             
            </div>
        </>
    )
}

export default WelComePage
