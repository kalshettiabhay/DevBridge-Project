
import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { Home, User, Briefcase, LogOut, Code } from "lucide-react";

const DeveloperNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { label: "Profile", link: "/developer-profile", icon: User },
    { label: "Projects", link: "/projectlist", icon: Briefcase }
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10 shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={"/Developer"}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              DevBridge
            </h1>
          </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={index}
                  href={item.link}
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                >
                  <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.label}</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </a>
              );
            })}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            <span>Logout</span>
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-slate-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DeveloperNavbar;
