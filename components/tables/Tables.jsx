/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import TableRow from "../../components/tables/TableRow";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext"; // ใช้ InputText สำหรับช่องค้นหา
import Link from "next/link";

const Tables = ({
  table,
  header,
  food,
  order,
  user,
  buttonText,
  path,
  setFectData,
  fectData,
}) => {
  const [globalFilter, setGlobalFilter] = useState(""); // สถานะสำหรับการค้นหาทั่วไป

  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">{table}</h3>
                  </div>
                  <div className="card-body">
                    <div
                      className="flex justify-between"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      {/* ช่องค้นหาทั่วไป */}
                      <div className="p-inputgroup" style={{ width: "18rem" }}>
                        <span
                          className="p-inputgroup-addon"
                          style={{ background: "white" }}
                        >
                          <i className="pi pi-search" />
                        </span>
                        <InputText
                          value={globalFilter}
                          onChange={(e) => setGlobalFilter(e.target.value)}
                          placeholder="Search"
                        />
                      </div>
                      <div>
                        {user ? (
                          <Link href={"/admin/users/adduser"}>
                            <Button
                              label="Add User"
                              icon="pi pi-plus"
                              size="small"
                              style={{ borderRadius: "8px" }} // ใช้ style inline เพื่อคุม borderRadius
                            />
                          </Link>
                        ) : food ? (
                          <Link href={"/admin/list/addfood"}>
                            <Button
                              label="Add Food"
                              icon="pi pi-plus"
                              size="small"
                              style={{ borderRadius: "8px" }} // ใช้ style inline เพื่อคุม borderRadius
                            />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                    {food && (
                      <TableRow
                        data={food}
                        type={"food"}
                        setFectData={setFectData}
                        fectData={fectData}
                        globalFilter={globalFilter}
                      />
                    )}

                    {order && (
                      <TableRow
                        data={order}
                        type={"order"}
                        setFectData={setFectData}
                        fectData={fectData}
                        globalFilter={globalFilter}
                      />
                    )}

                    {user && (
                      <TableRow
                        data={user}
                        type={"user"}
                        setFectData={setFectData}
                        fectData={fectData}
                        globalFilter={globalFilter}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tables;
