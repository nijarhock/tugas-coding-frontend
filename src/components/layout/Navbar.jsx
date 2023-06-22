import React, { useState } from 'react'

import Avatar1 from '../../assets/avatar/avatar-1.png'
import appConfig from '../../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../../utils/Session';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const userSession = JSON.parse(getTokenWithExpiration("user"));
  const token = getTokenWithExpiration('token');
  const [dropdownUser, setDropdownUser] = useState(false);
  const [toggleNotification, settoggleNotification] = useState(false);
  const [toggleSidebar, settoggleSidebar] = useState(false);

  const handleToggleSidebar = () => {
    if(!toggleSidebar) {
      document.body.classList.add('sidebar-mini');
      settoggleSidebar(true);
    } else {
      document.body.classList.remove('sidebar-mini');
      settoggleSidebar(false);
    }
  }

  const handleLogout = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post(`${appConfig.baseurlAPI}/logout`).then(() => {
        localStorage.removeItem("token");
        navigate("/");
    });
  }

  return (
    <nav className="navbar navbar-expand-lg main-navbar">
        <form className="form-inline mr-auto">
          <ul className="navbar-nav mr-3">
            <li><a href="#" onClick={handleToggleSidebar} className="nav-link nav-link-lg"><i className="fas fa-bars"></i></a></li>
          </ul>
          
        </form>
        <ul className="navbar-nav navbar-right">
          
          <li className={`dropdown ${dropdownUser ? 'show' : ''}`}>
            <a href="#" onClick={() => setDropdownUser((prev) => !prev)} className="nav-link dropdown-toggle nav-link-lg nav-link-user">
              <img alt="image" src={Avatar1} className="rounded-circle mr-1" />
              <div className="d-sm-none d-lg-inline-block">Hi, {userSession ? userSession.name : ""}</div>
            </a>
            <div className={`dropdown-menu dropdown-menu-right ${dropdownUser ? 'show' : ''}`}>
              
              <div className="dropdown-divider"></div>
              <a href="#" onClick={handleLogout} className="dropdown-item has-icon text-danger">
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
  )
}
