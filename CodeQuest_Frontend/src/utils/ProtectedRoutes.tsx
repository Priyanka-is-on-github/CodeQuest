import { useAuth } from "@/context/AuthProvider";
import  { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";

// Debounce function
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Debounced toast error (only allows one call per 2000ms)
const debouncedToastError = debounce((message: string) => {
  toast(message);
}, 2000);

function ProtectedRoutes({
  children,
  requireRole,
}: {
  children: ReactNode;
  requireRole: string;
}) {
  const { user, checkAuth, selectedRole } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!checkAuth()) {
      navigate(`/signin/${selectedRole}`);
    }
    if (!user) {
      debouncedToastError("Sign up to get started!");
     
      navigate("/");
      return;
    }

    if (!requireRole.includes(user.role)) {
      navigate("/unauthorized");
    }
  }, [user, navigate, requireRole]);

  if (!user) return null;
  if (!requireRole.includes(user.role)) return null;
  return children;
}

export default ProtectedRoutes;
