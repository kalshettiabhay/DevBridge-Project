
import React from "react";
import {Link, useNavigate} from "react-router-dom";

const ClientNavbar=()=>{
 const navigate= useNavigate();
     const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };
  

    return <>
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white px-6 py-4 shadow-2xl border-b border-blue-800/50 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">DevBridge</h1>
          </div>
          <div className="space-x-8 hidden md:flex items-center">
              <Link to={"/user-profile"} className="text-slate-200 hover:text-white transition-colors duration-200 font-medium hover:underline decoration-blue-400 underline-offset-4">Profile</Link>
            <Link to={"/tab-navigation"} className="text-slate-200 hover:text-white transition-colors duration-200 font-medium hover:underline decoration-blue-400 underline-offset-4">Project Requests</Link>
               <button onClick={logout} className="text-slate-300 hover:text-red-400 transition-colors duration-200 font-medium border border-slate-600 hover:border-red-400 px-4 py-2 rounded-lg hover:bg-red-500/10">Logout</button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
}
export default ClientNavbar;
