import { Link } from 'react-router-dom';
import React from 'react'

export default function Pagination({ links = [], handleSearchChange }) {
  if (links.length === 3) return null;
  return (
    <div className="card-footer text-right">
      <nav className="d-inline-block">
        <ul className="pagination mb-0">
          {links.map((link, index) => {
            let url = link.url;
            let page = 1;
            if(url !== null) {
              let params = new URLSearchParams(url.split('?')[1]);
              page = params.get('page');
            } else {
            }
            if(index === 0) {
              return (
                <li className="page-item" key={index}>
                  <button className="page-link" onClick={() => handleSearchChange("pages", page)} tabIndex="-1"><i className="fas fa-chevron-left"></i></button>
                </li>
              )
            } else if(index+1 === links.length) {
              return (
                <li className="page-item" key={index}>
                  <button className="page-link" onClick={() => handleSearchChange("pages", page)}><i className="fas fa-chevron-right"></i></button>
                </li>
              )
            } else {
              return (
                <li className={`page-item ${link.active ? 'active' : ''}`} key={index}>
                  <button className="page-link" onClick={() => handleSearchChange("pages", page)}>{ link.label } { link.active && <span className="sr-only">(current)</span> }</button>
                </li>
              )
            }
          })}
        </ul>
      </nav>
    </div>
  )
}