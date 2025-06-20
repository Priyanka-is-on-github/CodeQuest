
import QuestionNavbar from '@/_components/QuestionNavbar'

import React from 'react'

function QuestionLayout({children}:{children: React.ReactNode}) {
  return (
    <div className="h-full ">
    <div className="h-[80px]  fixed inset-y-0 w-full z-10">
      <QuestionNavbar />
    </div>

   

    <main className=" pt-[80px] h-[100vh] ">{children}</main>
  </div>
  )
}

export default QuestionLayout