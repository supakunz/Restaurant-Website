import React from "react";

const AdminFoot = () => {
  return (
    <>
      <div>
        {/* /.content-wrapper */}
        <footer className="main-footer">
          <strong>
            ©2024 Developer ❤️ by{" "}
            <a target="_blank" href="https://github.com/supakunz">
              Supakun Thata
            </a>
          </strong>
          {/* All rights reserved. */}
          <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 1.0.0
          </div>
        </footer>
      </div>
    </>
  );
};

export default AdminFoot;
