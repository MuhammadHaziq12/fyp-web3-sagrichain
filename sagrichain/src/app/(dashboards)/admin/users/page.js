import React from 'react'
import ListUsers from "@/src/components/stakeholderdashboards/admin/Users.jsx"

export const metadata = {
  title: "Admin Dashboard: User List",
};

const page = () => {
  return (
    <div>
        <ListUsers/>
    </div>
  )
}

export default page
