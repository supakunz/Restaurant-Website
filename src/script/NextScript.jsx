/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from "next/script";

const NextScript = () => {
  return (
    <>
      {/* jQuery (จำเป็นก่อนที่ DOM จะเริ่มโต้ตอบ) */}
      <Script
        src="/plugins/jquery/jquery.min.js"
        strategy="beforeInteractive"
      ></Script>
      {/* jQuery UI (จำเป็นสำหรับ UI ที่ใช้ jQuery) */}
      <Script
        src="/plugins/jquery-ui/jquery-ui.min.js"
        strategy="beforeInteractive"
      ></Script>
      {/* Bootstrap 4 (จำเป็นก่อนการโหลดส่วนอื่น) */}
      <Script
        strategy="beforeInteractive"
        src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
      ></Script>

      {/* DataTables & Plugins (หลังจากที่ jQuery โหลดแล้ว) */}
      <Script
        src="/plugins/datatables/jquery.dataTables.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/plugins/datatables-responsive/js/dataTables.responsive.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/plugins/datatables-buttons/js/dataTables.buttons.min.js"
        strategy="beforeInteractive"
      ></Script>
      {/* ไฟล์เพิ่มเติมสำหรับ DataTables */}
      <Script
        src="/plugins/jszip/jszip.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/plugins/pdfmake/pdfmake.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/plugins/pdfmake/vfs_fonts.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/plugins/datatables-buttons/js/buttons.html5.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/plugins/datatables-buttons/js/buttons.print.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="/plugins/datatables-buttons/js/buttons.colVis.min.js"
        strategy="beforeInteractive"
      ></Script>

      {/* ChartJS & อื่นๆ ที่ไม่จำเป็นต้องโหลดก่อน */}
      <Script
        src="/plugins/chart.js/Chart.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/plugins/sparklines/sparkline.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/plugins/jqvmap/jquery.vmap.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/plugins/jqvmap/maps/jquery.vmap.usa.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/plugins/jquery-knob/jquery.knob.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/plugins/moment/moment.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/plugins/daterangepicker/daterangepicker.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/plugins/summernote/summernote-bs4.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script src="/dist/js/adminlte.js" strategy="afterInteractive"></Script>
    </>
  );
};

export default NextScript;
