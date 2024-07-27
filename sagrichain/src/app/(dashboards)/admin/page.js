import React from 'react'
import HeaderStats from '@/src/components/dashboard/Headers/HeaderStats';

export const metadata = {
  title: "Admin Dashboard",
};

const page = () => {
  return (
    <div className="relative w-full bg-blueGray-100">      
        <HeaderStats />
    </div>
  )
}

export default page
