import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">DevBridge</h1>
          <nav className="space-x-4 hidden md:block">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#how-it-works" className="hover:underline">How it Works</a>
            <a href="#contact" className="hover:underline">Contact</a>
           <Link to={"/login"}> <button className="bg-white text-blue-700 px-3 py-1 rounded-md hover:bg-gray-100 transition">Login</button></Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Bridge the Gap Between Clients and Developers</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            DevBridge helps businesses connect with verified software companies and developers without relying on freelancers or intermediaries.
          </p>
          <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition">
            Post a Project
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">Verified Developers</h4>
              <p className="text-gray-600">Connect with experienced, screened professionals and companies.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Secure Messaging</h4>
              <p className="text-gray-600">Communicate securely with developers inside the platform.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Transparent Pricing</h4>
              <p className="text-gray-600">No hidden charges — get clear estimates and timelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-700 mb-2">1</div>
              <h4 className="text-xl font-semibold mb-2">Post Your Requirement</h4>
              <p className="text-gray-700">Describe your website or app requirement in simple terms.</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-700 mb-2">2</div>
              <h4 className="text-xl font-semibold mb-2">Match With Developers</h4>
              <p className="text-gray-700">We match you with the best-fit software companies or developers.</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-700 mb-2">3</div>
              <h4 className="text-xl font-semibold mb-2">Start Building</h4>
              <p className="text-gray-700">Kick off your project with full tracking and milestone updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-white">
        <h3 className="text-3xl font-bold mb-4">Ready to Build Your Dream Project?</h3>
        <p className="text-gray-600 mb-6">Start connecting with trusted software teams now.</p>
        <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>Contact us at <a href="mailto:info@devbridge.com" className="underline">info@devbridge.com</a></p>
          <p className="mt-2">&copy; {new Date().getFullYear()} DevBridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
