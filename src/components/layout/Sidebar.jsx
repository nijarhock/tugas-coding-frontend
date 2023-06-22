import { Link } from 'react-router-dom'
import Menu from './Menu'
import React from 'react'
import { menuList } from '../../utils/menuList'

export default function Sidebar() {
  return (
    <div className="main-sidebar sidebar-style-2">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <Link to="/dashboard">Resto</Link>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
          <Link to="/dashboard">St</Link>
        </div>
        <ul className="sidebar-menu">
          {menuList.map((menu) => {
            return (
              <div key={menu.id}>
                <li className="menu-header">{ menu.title }</li>
                {menu.mainMenu.map((main) => {
                  return <Menu menu={main} key={main.id}/>
                })}
              </div>
            )
          })}
        </ul>
      </aside>
    </div>
  )
}
