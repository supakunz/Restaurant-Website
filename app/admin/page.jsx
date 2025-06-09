"use client";

import AdminHome from "../../components/admin/AdminHome";
import AdminFoot from "@/components/admin/AdminFoot";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminPage = () => {
  return (
    <>
      <AdminHeader />
      <AdminHome />
      <AdminFoot />
    </>
  );
};

export default AdminPage;
