import { clearAuthData, isTokenExpired } from '@/utils/authUtils';
import  { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { boolean } from 'yup';

interface AuthContextType{
user:any,
signin:(userData:any, token:string)=>void,
signout:()=>void,
checkAuth:()=>boolean
 selectedRole:string | null,
  setSelectedRole:Dispatch<SetStateAction<string| null>>,
}
const AuthContext = createContext<AuthContextType>({
  user:null,
  signin:()=>{},
  signout:()=>{},
  checkAuth:()=>{return false},
  selectedRole:'',
  setSelectedRole:()=>{},
});

function AuthProvider({children}:{children: ReactNode}) {
  const [user, setUser] = useState(()=>{

    const storedUser = localStorage.getItem("pos-user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const selectedRolefromlocalStorage =localStorage.getItem('role') 
    const [selectedRole, setSelectedRole] = useState(!selectedRolefromlocalStorage? '': selectedRolefromlocalStorage);

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
   <AuthContext.Provider value={{user, signin, signout, checkAuth, selectedRole, setSelectedRole }}>
{children}
   </AuthContext.Provider>

  )
}

export const useAuth =()=> useContext(AuthContext)
export default AuthProvider