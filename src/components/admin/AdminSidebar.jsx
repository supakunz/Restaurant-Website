/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { logOut } from "../../store/UserSlice";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";

const AdminSidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logOut());
    await signOut();
    return (window.location.href = "/food");
  };

  return (
    <>
      <div>
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <Link href="/admin" className="brand-link">
            <img
              src="/dist/img/logov3.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">Restaurant</span>
          </Link>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="/dist/img/avatar4.png"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  Admin
                </a>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-header">MENU</li>
                <li className="nav-item">
                  <Link className="nav-link" href={"/admin/list"}>
                    <i className="nav-icon fas fa-clipboard-list" />
                    <p>Food List</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={"/admin/orders"}>
                    <i className="nav-icon fas fa-box-open" />
                    <p>Orders</p>
                  </Link>
                </li>

                <li className="nav-header">MEMBER</li>
                <li className="nav-item">
                  <Link className="nav-link" href={"/admin/users"}>
                    <i className="nav-icon fas fa-users" />
                    <p>Users</p>
                  </Link>
                </li>

                <li className="nav-header">DASHBOARD</li>
                <li className="nav-item">
                  <Link className="nav-link" href={"/admin"}>
                    {/* /admin/reports */}
                    <i className="nav-icon fas fa-chart-bar" />
                    <p>Reports</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    onClick={handleLogout}
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    <i class="nav-icon fas fa-sign-out-alt"></i>
                    <p>Logout</p>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    </>
  );
};

export default AdminSidebar;
