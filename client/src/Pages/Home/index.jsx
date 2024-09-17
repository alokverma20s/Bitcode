// Home.js

import React, { useState } from 'react';
import Auth from '../../components/Auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInfo = localStorage.getItem("userInfo");
  console.log(userInfo);
  const navigate = useNavigate();
  
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col text-white">
      {/* Navbar */}
      <nav id='navbar' className="absolute top-0 w-full z-50">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-white text-2xl sm:text-4xl font-extrabold tracking-wider">Bitcode</h1>
          <div>
            {!userInfo ?(
              <div>
                <button onClick={()=> setIsModalOpen(true)} className="text-white hover:text-yellow-400 transition duration-300 border border-white px-4 py-2 rounded font-semibold">Login</button>
                <Auth isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> 
              </div>
            ) : (
              <div className='flex gap-5'>
                <a href='/contest' className="text-white hover:text-yellow-400 transition duration-300 border border-white px-4 py-2 rounded font-semibold">Contest</a>
                <button onClick={()=> {
                  localStorage.removeItem("userInfo");
                  navigate('/');
                }} className="text-white hover:text-yellow-400 transition duration-300 border border-white px-4 py-2 rounded font-semibold">Logout</button>
              </div>
            )
            }
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="h-screen bg-cover bg-center flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold mb-8 animate-fadeInUp">Welcome to <span className="text-yellow-400">Bitcode</span></h1>
          <p className="text-gray-400 text-lg sm:text-xl mb-10 animate-fadeInUp delay-1s">Compete, Learn, and Rise to the Top!</p>
          <button onClick={()=> userInfo? navigate('/contest'):setIsModalOpen(true)} className="bg-yellow-500 text-black py-3 px-6 rounded-full text-sm sm:text-lg hover:bg-yellow-600 font-bold shadow-lg transition-transform transform hover:scale-110">Get Started</button>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <a href="#features">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-12 w-8 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-10 sm:py-20 bg-gray-800">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-8 sm:mb-12 text-yellow-400">What We Offer</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-700 p-6 sm:p-10 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Live Coding Contests</h3>
              <p className="text-gray-300">Join real-time coding battles and climb up the leaderboard as you code.</p>
            </div>
            <div className="bg-gray-700 p-6 sm:p-10 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Comprehensive Tutorials</h3>
              <p className="text-gray-300">Access resources that help you sharpen your skills while preparing for contests.</p>
            </div>
            <div className="bg-gray-700 p-6 sm:p-10 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Global Challenges</h3>
              <p className="text-gray-300">Compete against coders worldwide and get recognized on our leaderboards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-10 sm:py-20 bg-gray-900">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-8 sm:mb-10 text-yellow-400">Our Mission</h2>
          <p className="text-md sm:text-lg text-gray-400 mb-8 sm:mb-10">Bitcode is a global platform that aims to bring out the best coding talent through exciting challenges and competitions. Whether you're a seasoned developer or just starting, we offer opportunities to learn, compete, and succeed at every level.</p>
          <a href="#signup" className="bg-yellow-500 text-black py-3 px-6 sm:px-8 rounded-full hover:bg-yellow-600 transition-transform transform hover:scale-110">Join Us Now</a>
        </div>
      </section>

      {/* Signup Section */}
      <section id="signup" className="py-10 sm:py-20 bg-gray-800">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-8 sm:mb-10 text-yellow-400">Ready to Level Up?</h2>
          <p className="text-md sm:text-xl text-gray-400 mb-8 sm:mb-10">Join thousands of coders in real-time competitions and unlock your full potential!</p>
          <a href={`${userInfo?'/contest':'#navbar'}`} className="bg-yellow-500 text-black py-3 px-6 sm:px-8 rounded-full hover:bg-yellow-600 font-bold shadow-lg transition-transform transform hover:scale-110">Sign Up Now</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto text-center text-gray-400 px-4">
          <p>&copy; 2024 Bitcode. All rights reserved.</p>
          <div className="mt-4">
            <a href="#terms" className="hover:text-white transition duration-300 mr-4">Terms</a>
            <a href="#privacy" className="hover:text-white transition duration-300">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;