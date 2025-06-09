/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const AdminHeader = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link href="/admin" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              href="#"
              role="button"
            >
              <i className="fas fa-th-large" />
            </a>
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
    </div>
  );
};

export default AdminHeader;
