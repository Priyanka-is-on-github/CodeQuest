
import DashboardSidebar from '@/_components/DashboardSidebar'
import React from 'react'

function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
   
    <div className="h-full flex">
    

   <div className="h-full hidden md:flex w-56 flex-col fixed inset-y-0 z-50 ">
      <DashboardSidebar />
    </div> 

    <main className="md:pl-60  h-[100vh] w-full  flex overflow-y-hidden">{children}</main>

    

  </div>
  )
}


export default DashboardLayout