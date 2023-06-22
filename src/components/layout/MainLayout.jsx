import React, { useEffect } from 'react'

import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { getTokenWithExpiration } from '../../utils/Session';
import { useNavigate } from 'react-router-dom';

export default function MainLayout({ children }) {
  const token = getTokenWithExpiration('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div id="app">
      <div className="main-wrapper main-wrapper-1">
        <div className="navbar-bg"></div>
        <Navbar />
        <Sidebar />
        <div className="main-content">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
  
}
