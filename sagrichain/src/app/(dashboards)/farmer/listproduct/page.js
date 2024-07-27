import React from 'react'
import ListProducts from "@/src/components/dashboard/common/ListProducts.jsx"

export const metadata = {
  title: "Farmer Dashboard: Product List",
};

const page = () => {
  return (
    <div>
        <ListProducts/>
    </div>
  )
}

export default page
