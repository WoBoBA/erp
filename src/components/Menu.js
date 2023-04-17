import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../img/AdminLTELogo.png"
import User from "../img/user2-160x160.jpg" 

export default function Menu() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <NavLink to="/" className="brand-link">
        <img
          src={Logo}
          alt="Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </NavLink>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={User}
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <NavLink to="/" className="info">     
              Alexander Pierce
          </NavLink>
        </div>
        {/* SidebarSearch Form */}
{/*         <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div> */}
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item menu-open">
              <NavLink to="/" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                  <i className="right fas fa-angle-left" />
                </p>
              </NavLink>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>Dashboard v1</p>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to="/404" className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>
                  Widgets
                  <span className="right badge badge-danger">New</span>
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
