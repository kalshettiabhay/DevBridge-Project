
import React from "react";
import {Link, useNavigate} from "react-router-dom";

const ClientDashboard = () => {
 const navigate= useNavigate();

 const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };
  

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Bring Your Project to <span className="text-blue-400">Life</span>
          </h2>
          <p className="text-slate-200 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            DevBridge connects business owners with verified software companies and developers. No freelancers, just trusted tech teams.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            Post Your Project
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
      </section>

      {/* Client Features */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Client Dashboard Features</h3>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Powerful tools designed to streamline your development journey from concept to completion</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-slate-800">Post Your Requirements</h4>
              <p className="text-slate-600 leading-relaxed">Easily describe your project, budget, and goals in a structured, intuitive form designed for clarity.</p>
            </div>
            <div className="group p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-slate-800">Get Developer Matches</h4>
              <p className="text-slate-600 leading-relaxed">Receive proposals from verified developers and companies with proven track records.</p>
            </div>
            <div className="group p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-slate-800">Chat & Negotiate</h4>
              <p className="text-slate-600 leading-relaxed">Communicate directly and securely with shortlisted teams through our integrated platform.</p>
            </div>
            <div className="group p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-slate-800">Track Milestones</h4>
              <p className="text-slate-600 leading-relaxed">Visual dashboard to monitor project status, deliverables, and progress in real-time.</p>
            </div>
            <div className="group p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-slate-800">Approve Payments</h4>
              <p className="text-slate-600 leading-relaxed">Pay securely only when milestones are completed to your complete satisfaction.</p>
            </div>
            <div className="group p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-slate-800">Rate Your Experience</h4>
              <p className="text-slate-600 leading-relaxed">Give feedback and help other clients find great developers in our community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16">
            <h3 className="text-4xl font-bold text-slate-800 mb-4">How DevBridge Works for Clients</h3>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Simple, streamlined process to turn your ideas into reality</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-800">Post Your Project</h4>
              <p className="text-slate-600 leading-relaxed">Enter your goals, timeline, and expectations in just a few clicks using our intuitive project builder.</p>
              <div className="hidden md:block absolute top-10 left-full w-24 h-0.5 bg-gradient-to-r from-blue-300 to-transparent -translate-x-12"></div>
            </div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-800">Choose a Developer</h4>
              <p className="text-slate-600 leading-relaxed">Review matches, check portfolios, and compare proposals easily with our comprehensive evaluation tools.</p>
              <div className="hidden md:block absolute top-10 left-full w-24 h-0.5 bg-gradient-to-r from-emerald-300 to-transparent -translate-x-12"></div>
            </div>
            <div>
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-800">Track & Collaborate</h4>
              <p className="text-slate-600 leading-relaxed">Follow every update and milestone from your personal dashboard with real-time notifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">Start Building Your Vision Today</h3>
          <p className="text-slate-200 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">Join DevBridge and connect with development experts who understand your needs and deliver exceptional results.</p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            Create a Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 text-center py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} DevBridge | All Rights Reserved | Connecting Vision with Innovation</p>
        </div>
      </footer>
    </div>
  );
};

export default ClientDashboard;
