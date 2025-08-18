

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export const Protectedroutes = ({ children }) => {
  console.log("Protectedroutes mounted"); // on render

  const { isAuthenticated } = useSelector(store => store.auth);
  console.log("isAuthenticated value:", isAuthenticated);

  if (!isAuthenticated) {
 
    return <Navigate to="/login" />;
  }

  return children;
};


export const Authenticated = ({ children }) => {
  const { isAuthenticated } = useSelector(store => store.auth);
  if (isAuthenticated) {
    return <Navigate to='/' />
  }
  return children
}


export const Adminauthenticated = ({ children }) => {
  console.log("click")
  const { user, isAuthenticated } = useSelector(store => store.auth);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;  
  }

  if (user?.Role !== 'Student') {
    
  return children;
   
  }
    return <Navigate to='/' />;   
};
