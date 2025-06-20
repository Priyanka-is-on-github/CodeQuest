import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/error_page";
import Home from "./pages/home_page/Home";
import RegisterUser from "./pages/register_page/SignupUser";

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
import SignupUser from "./pages/register_page/SignupUser";
import Unauthorised from "./pages/unauthorized_page";
import ProtectedRoutes from "./utils/ProtectedRoutes";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <Error />,
    },
    {
      path: "/signup",
      element: <SignupUser/>,
      errorElement: <Error />,
    },
    {
      path: "/signin",
      element: <SigninUser/>,
      errorElement: <Error />,
    },
    {
      path: "/user/dashboard",
      element:<ProtectedRoutes requireRole={'user'}> <Dashboard/> </ProtectedRoutes> ,
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
      path: "/compete",
      element: <Compete/>,
      errorElement: <Error />,
    },
    {
      path: "/compete/information",
      element: <InformationPage/>,
      errorElement: <Error />,
    },
    {
      path: "/admin/dashboard",
      element: <ProtectedRoutes requireRole={'admin'}><AdminDashboard/></ProtectedRoutes>,
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