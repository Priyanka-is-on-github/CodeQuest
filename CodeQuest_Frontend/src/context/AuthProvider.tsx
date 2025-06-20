import { clearAuthData, isTokenExpired } from '@/utils/authUtils';
import  { createContext, ReactNode, useContext, useState } from 'react'
import { boolean } from 'yup';

interface AuthContextType{
user:any,
signin:(userData:any, token:string)=>void,
signout:()=>void,
checkAuth:()=>boolean
}
const AuthContext = createContext<AuthContextType>({
  user:null,
  signin:()=>{},
  signout:()=>{},
  checkAuth:()=>{return false}
});

function AuthProvider({children}:{children: ReactNode}) {
  const [user, setUser] = useState(()=>{

    const storedUser = localStorage.getItem("pos-user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const signin =(userData:any, token:string)=>{
    if (isTokenExpired(token)) {
    clearAuthData();
    return false;
  }
    
    localStorage.setItem("pos-user", JSON.stringify(userData))
    localStorage.setItem("pos-token", token);
    setUser(userData);
    return(true)
  }

  //Add this to your context
const checkAuth = () => {
  const token = localStorage.getItem('pos-token');
  if (isTokenExpired(token)) {
    clearAuthData();
    setUser(null);
    return false;
  }
  return true;
};
  const signout =()=>{
    setUser(null);
    localStorage.removeItem("pos-user");
    localStorage.removeItem("pos-token");
  }

  return (
   <AuthContext.Provider value={{user, signin, signout, checkAuth}}>
{children}
   </AuthContext.Provider>

  )
}

export const useAuth =()=> useContext(AuthContext)
export default AuthProvider