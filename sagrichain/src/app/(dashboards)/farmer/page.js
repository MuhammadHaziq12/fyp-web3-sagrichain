"use client"
import React from 'react'
import HeaderStats from '@/src/components/dashboard/Headers/HeaderStats';
import withAuth from '@/Utils/withAuth.js'
const page = () => {
  return (
    <div className="relative w-full bg-blueGray-100">      
        <HeaderStats />
    </div>
  )
}

export default page;
