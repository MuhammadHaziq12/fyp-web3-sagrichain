import React from 'react'
import ListProducts from "@/src/components/dashboard/common/Stock.jsx"

export const metadata = {
  title: "Farmer Dashboard: Stock",
};

const page = () => {
  return (
    <div>
        <ListProducts/>
    </div>
  )
}

export default page
