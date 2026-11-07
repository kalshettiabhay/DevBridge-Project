
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  Eye, 
  FileText, 
  TrendingUp, 
  User, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  Activity,
  Target,
  Award
} from "lucide-react";

const DeveloperDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        
        <div className="relative px-6 py-16 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl">
                <Activity className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
                Welcome Back, Developer!
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Manage your projects, track progress, and grow your career with our comprehensive developer dashboard.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Active Projects */}
              <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-2xl">
                      <Briefcase className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Active Projects</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      CRM for Local Business
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      React Portfolio App
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Projects */}
              <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-2xl">
                      <Eye className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-2xl font-bold text-white">12</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Available Projects</h3>
                  <p className="text-sm text-slate-300 mb-4">New projects to bid on</p>
                  <button 
                    onClick={() => navigate('/projectlist')}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105"
                  >
                    View All
                  </button>
                </div>
              </div>

              {/* Submitted Proposals */}
              <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-2xl">
                      <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Submitted Proposals</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      School Management App
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      Analytics Dashboard
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings */}
              <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl">
                      <DollarSign className="w-6 h-6 text-yellow-400" />
                    </div>
                    <span className="text-2xl font-bold text-white">₹2.5L</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Monthly Earnings</h3>
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% from last month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project Progress */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl">
                    <Target className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Project Progress</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">E-Commerce Application</h4>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">60% Complete</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 mb-3">
                      <div className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg" style={{width: '60%'}}></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Frontend & Backend Integration</span>
                      <span>Due: Dec 15, 2024</span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">Admin Panel Dashboard</h4>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">90% Complete</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 mb-3">
                      <div className="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg" style={{width: '90%'}}></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Final Testing & Deployment</span>
                      <span>Due: Nov 30, 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-slate-500/20 to-gray-500/20 rounded-xl">
                      <User className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Profile</h3>
                  </div>
                  <p className="text-slate-300 text-sm mb-4">Manage your professional information and showcase your skills to potential clients.</p>
                  <button 
                    onClick={() => navigate('/developer-profile')}
                    className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 py-3 rounded-xl font-medium hover:from-slate-700 hover:to-slate-800 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>

                {/* Skills & Achievements */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-xl">
                      <Award className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Skills & Achievements</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">React.js Expert</span>
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Node.js Professional</span>
                      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">MongoDB Certified</span>
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
