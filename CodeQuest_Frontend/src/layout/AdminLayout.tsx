import AdminNavbar from '@/_components/AdminNavbar'
import AdminSidebar from '@/_components/AdminSidebar'
import React from 'react'

function AdminLayout({children}:{children: React.ReactNode}) {
  return (
    <div className="h-full ">
    <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-10">
      <AdminNavbar />
    </div>

    <div className="h-full hidden md:flex w-56 flex-col fixed inset-y-0 z-50 ">
      <AdminSidebar/>
    </div>

    <main className="md:pl-56 pt-[80px] h-[100vh] ">{children}</main>
  </div>
  )
}

export default AdminLayout