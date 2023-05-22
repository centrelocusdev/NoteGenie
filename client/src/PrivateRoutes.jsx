import { useState } from "react"
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const redirectTo = useState(window.location.pathname);

  let auth = Cookies.get('access-token')

  //before API integration
  return auth ? <Outlet /> :<Outlet />
  //after API integration
  // return auth ? <Outlet /> : <Navigate to='/login' state={{from: redirectTo}} />
}

export default PrivateRoutes