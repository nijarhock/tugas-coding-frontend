import React, { useState } from 'react'

import { Link } from 'react-router-dom'

export default function Menu({ menu }) {
  const [clickSub, setclickSub] = useState(false);
  if(menu.sub) {
    return (
      <div>
        <li className="nav-item dropdown">
          <a href="#" onClick={() => setclickSub((prev) => !prev)} className={`nav-link has-dropdown ${clickSub ? 'active-dropdown' : ''}`}><i className={menu.icon}></i><span>{menu.name}</span></a>
          <ul className={`dropdown-menu ${clickSub ? 'open-menu' : 'hidden'}`}>
            {menu.sub.map((sub) => {
              return (
                <li key={sub.id}><Link className="nav-link" to={sub.link} >{sub.name}</Link></li>
              )
            })}
          </ul>
        </li>
      </div>
    )
  } else {
    return (
      <div> 
        <li className="nav-item dropdown">
          <Link to={menu.link} className="nav-link"><i className={menu.icon}></i><span>{menu.name}</span></Link>
        </li>
      </div>
    )
  }
}
