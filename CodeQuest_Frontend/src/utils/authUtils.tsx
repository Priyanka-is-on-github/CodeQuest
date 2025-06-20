export const isTokenExpired = (token:any) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('pos-token');
  localStorage.removeItem('pos-user');
};