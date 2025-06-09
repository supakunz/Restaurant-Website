import NextHead from "@/script/NextHead";
import NextScript from "@/script/NextScript";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProtectedAdminLayout from "../../lib/ProtectAdmin";
import NextAuthProvider from "@/provider/NextAuthProvider";

// * PrimeReact Css
import "primereact/resources/themes/lara-light-indigo/theme.css"; // เลือกธีมที่ต้องการ
import "primereact/resources/primereact.min.css"; // สไตล์หลักของ PrimeReact
import "primeicons/primeicons.css"; // สำหรับไอคอน

export default function AdminLayout({ children }) {
  return (
    <>
      <NextHead />
      <body className="wrapper hold-transition sidebar-mini layout-fixed">
        {/* Protect Admin Routes */}
        <ProtectedAdminLayout>
          <NextAuthProvider>
            <div className="wrapper">
              <main>{children}</main>
              <AdminSidebar />
            </div>
          </NextAuthProvider>
        </ProtectedAdminLayout>
      </body>
      <NextScript />
    </>
  );
}
