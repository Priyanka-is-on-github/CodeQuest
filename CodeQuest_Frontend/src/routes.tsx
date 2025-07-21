import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/error_page";
import Home from "./pages/home_page/Home";


import Dashboard from "./pages/user_dashboard_page/Dashboard";
import Admin from "./pages/admin_page/AdminDashboard";
import QuestionManagement from "./pages/questions_management/QuestionManagement";

import Question from "./pages/questions_management/Question";

import Compete from "./pages/compete_page/Compete";
import InformationPage from "./pages/compete_page/InformationPage";
import TestPage from "./pages/user_dashboard_page/TestPage";
import CodingProblem from "./pages/user_dashboard_page/CodingProblems";
import CodingProblems from "./pages/user_dashboard_page/CodingProblems";
import ProblemPage from "./pages/user_dashboard_page/ProblemPage";
import AdminDashboard from "./pages/admin_page/AdminDashboard";
import IntershipManagement from "./pages/intership_management";
import SigninUser from "./pages/signin_page/SigninUser";
import DeveloperSignup from "./pages/register_page/DeveloperSignup";
import Unauthorised from "./pages/unauthorized_page";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import InternshipInfoPage from "./pages/compete_page/InternshipInfoPage";
import Authentication from "./pages/authentication";
import OTPVerificationPage from "./pages/register_page/OTPVerificationPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <Error />,
    },
    {
      path: "/authorize",
      element: <Authentication/>,
      errorElement: <Error />,
    },
    {
      path: "/signup/:selectedRole",
      element: <DeveloperSignup/>,
      errorElement: <Error />,
    },
    {
      path: "/signup/otpverification",
      element: <OTPVerificationPage/>,
      errorElement: <Error />,
    },
    {
      path: "/signin/:selectedRole",
      element: <SigninUser/>,
      errorElement: <Error />,
    },
    {
      path: "/developer/dashboard",
      element:<ProtectedRoutes requireRole={'developer'}> <Dashboard/> </ProtectedRoutes> ,
      errorElement: <Error />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorised/>,
      errorElement: <Error />,
    },
    {
      path: "/test/instructions",
      element: <TestPage/>,
      errorElement: <Error />,
    },
    {
      path: "/test/problems",
      element: <CodingProblems/>,
      errorElement: <Error />,
    },
    {
      path:'/problem/:id',
      element: <ProblemPage/>,
      errorElement: <Error />,
    },
    {
      path:"/compete",
      element: <ProtectedRoutes requireRole={'developer'}> <Compete/> </ProtectedRoutes>,
      errorElement: <Error />,
    },
    {
      path: "/compete/internship",
      element: <InternshipInfoPage/>,
      errorElement: <Error />,
    },
    {
      path: "/compete/internship/information",
      element: <InformationPage/>,
      errorElement: <Error />,
    },
    {
      path: "/recruiter/dashboard",
      element: <ProtectedRoutes requireRole={'recruiter'}><AdminDashboard/></ProtectedRoutes>,
      errorElement: <Error />,
    },
    
  
    {
      path: "/admin/intershipsmanagement",
      element: <IntershipManagement/>,
      errorElement: <Error />,
    },
    {
      path: "/admin/questionmanagement",
      element: <QuestionManagement/>,
      errorElement: <Error />,
    },
    {
      path: "/admin/questionmanagement/easy",
      element: <Question/>,
      errorElement: <Error />,
    },
    {
      path: "/admin/questionmanagement/medium",
      element: <Question/>,
      errorElement: <Error />,
    },
    {
      path: "/admin/questionmanagement/hard",
      element: <Question/>,
      errorElement: <Error />,
    },
  
   
  
  
  ]);
  export default router;