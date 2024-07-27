"use client"
// Import React and the Link component from Next.js if needed for navigation
import React from 'react';
import Link from 'next/link';
// import './globals.css'

const AccessDenied = () => {
    return (
        <div className="h-full flex bg-gray-50 flex-col items-center justify-center p-4 text-white font-[Raleway]">
            <div className="text-9xl font-bold text-[#EE4B5E] mb-8" data-content="404">
                403 - ACCESS DENIED
            </div>
            <div className="text-5xl font-bold text-green-500 mb-8">
                Oops, You don't have permission to access this page.
            </div>
            <div className="text-lg text-center text-green-500 mx-12 my-8 px-8">
                
            </div>
            <div className="mt-8 text-green-500">
                <Link href="/register">
                    <span className="font-bold border-2 border-[#EE4B5E] py-4 px-8 rounded-full uppercase transition-colors duration-200 ease-in-out hover:bg-green-800 hover:text-white">
                        Register First
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default AccessDenied;
