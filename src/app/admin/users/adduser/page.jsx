/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getUserID, register, updateUserID } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Adduser = ({ id }) => {
  const router = useRouter();
  const [fectData, setFectData] = useState({});
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Loading Animation
    Swal.fire({
      title: "Loading...",
      html: "Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading(null);
      },
    });
    await register(userData)
      .then((res) => {
        console.log(res);
        Swal.close();
        Swal.fire("Create Success!", "", "success");
        setUserData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          role: "",
          phone: "",
          country: "",
          address: "",
          city: "",
          state: "",
          zip_code: "",
        });
        router.push("/admin/users");
      })
      .catch((err) => {
        console.log(err);
        Swal.close();
        Swal.fire("Create Faild!", "", "error");
        setUserData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          role: "",
          phone: "",
          country: "",
          address: "",
          city: "",
          state: "",
          zip_code: "",
        });
      });
  };

  // ----------------------------- Edit User -----------------------------
  //* Function get user from userID
  const fectInfo = async () => {
    await getUserID(id)
      .then((res) => {
        console.log(res.data);
        setFectData(...res.data.userdata);
        // setFectData(...res.data.addressdata);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Loading Animation
    Swal.fire({
      title: "Loading...",
      html: "Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading(null);
      },
    });
    await updateUserID(id, userData)
      .then((res) => {
        console.log(res);
        Swal.close();
        Swal.fire("Update Success!", "", "success");
        router.push("/admin/users");
      })
      .catch((err) => {
        console.log(err);
        Swal.close();
        Swal.fire("Update Faild!", "", "error");
      });
  };

  //* Call fectInfo function
  useEffect(() => {
    if (id) {
      fectInfo();
    }
  }, []);

  //* Set foodData for show data of state
  useEffect(() => {
    if (id && fectData) {
      setUserData({
        firstname: fectData.firstname,
        lastname: fectData.lastname,
        email: fectData.email,
        role: fectData.role,
        phone: fectData.phone,
        country: fectData.country,
        address: fectData.address,
        city: fectData.city,
        state: fectData.state,
        zip_code: fectData.zip_code,
      });
    }
  }, [fectData]);

  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper" style={{ paddingBottom: "2rem" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>{id ? "Edit User" : "Add New User"}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/admin">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/admin/users">Users</a>
                  </li>
                  <li className="breadcrumb-item active">
                    {id ? "Edit User" : "Add New User"}
                  </li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <form onSubmit={id ? handleUpdate : handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="card card-primary">
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#6366F1" }}
                  >
                    <h3 className="card-title">General</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="firstname">Firstname</label>
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="form-control"
                        onChange={handleChange}
                        value={userData.firstname}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Lastname</label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        className="form-control"
                        onChange={handleChange}
                        value={userData.lastname}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={handleChange}
                        value={userData.email}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">
                        {id ? "New Password" : "Password"}
                      </label>
                      <input
                        type="text"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={handleChange}
                        value={userData.password}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <select
                        id="role"
                        name="role"
                        className="form-control custom-select"
                        onChange={handleChange}
                        value={userData.role}
                      >
                        <option value={""} selected disabled>
                          Select one
                        </option>
                        <option value={"admin"}>Admin</option>
                        <option value={"user"}>User</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="number"
                        id="phone"
                        name="phone"
                        className="form-control"
                        onChange={handleChange}
                        value={userData.phone}
                      />
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              <div className="col-md-6">
                <div className="card card-secondary">
                  <div className="card-header">
                    <h3 className="card-title">Option</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="country">Country / Region</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        className="form-control"
                        onChange={handleChange}
                        value={userData.country}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Street Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        onChange={handleChange}
                        value={userData.address}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Town / City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        onChange={handleChange}
                        value={userData.city}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="form-control"
                        onChange={handleChange}
                        value={userData.state}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zip">Zip</label>
                      <input
                        type="number"
                        id="zip"
                        name="zip_code"
                        className="form-control"
                        onChange={handleChange}
                        value={userData.zip_code}
                      />
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Link
                  href="/admin/users"
                  className="btn btn-secondary"
                  style={{ borderRadius: "6px" }}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-success float-right"
                  style={{ borderRadius: "6px" }}
                >
                  Add User
                </button>
              </div>
            </div>
          </form>
        </section>
        {/* /.content */}
      </div>
    </>
  );
};

export default Adduser;
