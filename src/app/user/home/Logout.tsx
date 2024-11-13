'use client'
import { signOut } from 'next-auth/react';
import React from 'react'

const Logout = () => {
    const onLogout = async () => {
        await signOut();
        window.location.href = '/sign-in';
    };

    return (
        <div>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}

export default Logout