import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <div className="nav-link" data-widget="pushmenu" role="button">
            <i className="fas fa-bars" />
          </div>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/404" className="nav-link">
            Contact
          </NavLink>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/calender" className="nav-link">
            Calendar
          </NavLink>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        <li className="nav-item">
          <div
            className="nav-link"
            data-widget="navbar-search"
            role="button"
          >
            <i className="fas fa-search" />
          </div>
          <div className="navbar-search-block">
            <form className="form-inline">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search" />
                  </button>
                  <button
                    className="btn btn-navbar"
                    type="button"
                    data-widget="navbar-search"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
      </ul>
    </nav>
  );
}
