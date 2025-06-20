import { useAuth } from '@/context/AuthProvider'
import React, { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes({children, requireRole}:{children:ReactNode, requireRole:string}) {
    const {user, checkAuth} = useAuth()
    const navigate = useNavigate();

    useEffect(()=>{

        if (!checkAuth()) {
      navigate('/login');
    }
        if(!user){
            navigate('/')
            return;
        }

        if(!requireRole.includes(user.role)){
            navigate('/unauthorized')
        }
    },[user , navigate, requireRole])
 
    if(!user) return null;
    if(!requireRole.includes(user.role)) return null;
    return children
}

export default ProtectedRoutes