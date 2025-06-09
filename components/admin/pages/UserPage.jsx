/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tables from "../../tables/Tables";
import * as userService from "../../../services/userService";

const UserPage = () => {
  const [user, setUser] = useState([]);
  const [fectData, setFectData] = useState(false);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    userService
      .getAlluser(token)
      .then((res) => {
        setUser(res.data.userdata);
      })
      .catch((err) => console.log(err));
  }, [token, fectData]);

  return (
    <>
      <div className="content-wrapper overflow-hidden">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Users</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/admin">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Users</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Tables
          table={"All Orders Lists DataTable"}
          header={["Firstname", "Lastname", "Email", "Role", "Action"]}
          user={user}
          buttonText={"Add User"}
          path={"/adduser"}
          setFectData={setFectData}
          fectData={fectData}
        />
      </div>
    </>
  );
};

export default UserPage;
