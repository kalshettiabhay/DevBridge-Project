import React from "react";
import { useLocation } from "react-router-dom";
import ClientNavbar from "./client-components/ClientNavbar.jsx";
import DeveloperNavbar from "./developer-components/DeveloperNavbar.jsx";

const Layout = ({ children }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Pages that shouldn't show any navbar
  const hideNavbarRoutes = ["/login", "/register"];

  if (hideNavbarRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      {token && role === "User" && <ClientNavbar/>}
     {token && role === "Developer" && <DeveloperNavbar/>}
      {children}
    </>
  );
};

export default Layout;
