/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  BarController,
  DoughnutController,
  PieController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler,
} from "chart.js";
import { getAllfoods } from "@/services/foodService";
import { getAlluser } from "@/services/userService";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  BarController,
  DoughnutController,
  PieController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler
);

const AdminHome = () => {
  const [food, setFood] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const errorShown = useRef(false);

  useEffect(() => {
    getAlluser()
      .then((res) => setUser(res.data.userdata))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllfoods()
      .then((res) => setFood(res.data.fooddata))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return; // ✅ รอโหลดข้อมูลก่อน
    const getCtx = (id) => {
      const canvas = document.getElementById(id);
      return canvas ? canvas.getContext("2d") : null;
    };

    // ---------------------- areaChart ----------------------

    const areaChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Digital Goods",
          backgroundColor: "rgba(60,141,188,0.9)",
          borderColor: "rgba(60,141,188,0.8)",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: true,
          tension: 0.4, // เพิ่มตรงนี้เพื่อให้โค้ง
          pointRadius: 0, // <<< ซ่อนจุด
        },
        {
          label: "Electronics",
          backgroundColor: "rgba(210,214,222,1)",
          borderColor: "rgba(210,214,222,1)",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          tension: 0.4, // เพิ่มตรงนี้เพื่อให้โค้ง
          pointRadius: 0, // <<< ซ่อนจุด
        },
      ],
    };

    const commonOptions = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { display: false } },
      },
    };

    const areaChart = new Chart(getCtx("areaChart"), {
      type: "line",
      data: areaChartData,
      options: commonOptions,
    });

    // ---------------------- areaChart ----------------------

    // ---------------------- lineChart ----------------------

    // const lineChartData = JSON.parse(JSON.stringify(areaChartData));
    // lineChartData.datasets.forEach((d) => {
    //   d.fill = false;
    //   tension: 0.4; // เพิ่มตรงนี้เพื่อให้โค้ง
    //   pointRadius: 0; // <<< ซ่อนจุด
    // });

    // new Chart(getCtx("lineChart"), {
    //   type: "line",
    //   data: lineChartData,
    //   options: commonOptions,
    // });

    // ---------------------- lineChart ----------------------

    // ---------------------- donutChart & pieChart ----------------------

    const categories = ["Burger", "Drink", "Fried", "Pizza", "Steak", "Other"];
    let data;

    // เมื่อไม่มีข้อมูล food หรือ มีค่าว่างเปล่า
    if (!food || food.length === 0) {
      // ✅ กรณีไม่มีข้อมูล: ใช้ mock data
      data = [10, 10, 10, 10, 10, 10];
      if (!errorShown.current) {
        toast.error("Chart Error! ❌", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
          pauseOnHover: false,
        });
        errorShown.current = true;
      }
    } else {
      // นับจำนวนในแต่ละ category
      const countByCategory = food.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});

      // แปลงเป็น array ของจำนวนตามลำดับที่ต้องการ
      data = categories.map((cat) => countByCategory[cat] || 0);
    }

    const donutData = {
      labels: ["Burger", "Drink", "Fried", "Pizza", "Steak", "Other"],
      datasets: [
        {
          data: data || [700, 500, 400, 600, 300, 100],
          backgroundColor: [
            "#f56954",
            "#00a65a",
            "#f39c12",
            "#00c0ef",
            "#3c8dbc",
            "#d2d6de",
          ],
        },
      ],
    };

    const pieOptions = {
      maintainAspectRatio: false,
      responsive: true,
    };

    new Chart(getCtx("donutChart"), {
      type: "doughnut",
      data: donutData,
      options: pieOptions,
    });

    // new Chart(getCtx("pieChart"), {
    //   type: "pie",
    //   data: donutData,
    //   options: pieOptions,
    // });

    // ---------------------- donutChart & pieChart ----------------------

    // ---------------------- barChart & stackedBarChart ----------------------

    // const barChartData = JSON.parse(JSON.stringify(areaChartData));
    // [barChartData.datasets[0], barChartData.datasets[1]] = [
    //   areaChartData.datasets[1],
    //   areaChartData.datasets[0],
    // ];

    // new Chart(getCtx("barChart"), {
    //   type: "bar",
    //   data: barChartData,
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //   },
    // });

    // new Chart(getCtx("stackedBarChart"), {
    //   type: "bar",
    //   data: barChartData,
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     scales: {
    //       x: { stacked: true },
    //       y: { stacked: true },
    //     },
    //   },
    // });

    // ---------------------- barChart & stackedBarChart ----------------------

    return () => {
      Chart.getChart("areaChart")?.destroy();
      Chart.getChart("donutChart")?.destroy();
      // Chart.getChart("pieChart")?.destroy();
      // Chart.getChart("lineChart")?.destroy();
      // Chart.getChart("barChart")?.destroy();
      // Chart.getChart("stackedBarChart")?.destroy();
    };
  }, [food, loading]);

  return (
    <>
      <div>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper overflow-hidden">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Dashboard</h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/admin">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Main</li>
                  </ol>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              {/* -------------- Small boxes (Stat box) -------------- */}
              <div className="row">
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>150</h3>
                      <p>New Orders</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag" />
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </a>
                  </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>
                        {food?.length || "0"}
                        {/* <sup style={{ fontSize: 20 }}>%</sup> */}
                      </h3>
                      <p>Total Food Items</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars" />
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </a>
                  </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{user?.length || "0"}</h3>
                      <p>User Registrations</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </a>
                  </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>65</h3>
                      <p>Revenue</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph" />
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </a>
                  </div>
                </div>
                {/* ./col */}
              </div>
              {/* -------------- Small boxes (Stat box) -------------- */}

              {/* -------------- Main row -------------- */}
              <div className="row">
                <section className="content col-lg-12">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-6">
                        {/* DONUT CHART */}
                        <div className="card card-danger">
                          <div className="card-header">
                            <h3 className="card-title">Food Category Chart</h3>
                          </div>
                          <div className="card-body">
                            <canvas
                              id="donutChart"
                              style={{ height: "250px", maxWidth: "100%" }}
                            ></canvas>
                          </div>
                        </div>

                        {/* AREA CHART */}
                        {/* <div className="card card-primary">
                          <div className="card-header">
                            <h3 className="card-title">Area Chart</h3>
                          </div>
                          <div className="card-body">
                            <div className="chart">
                              <canvas
                                id="areaChart"
                                style={{ height: "250px", maxWidth: "100%" }}
                              ></canvas>
                            </div>
                          </div>
                        </div> */}

                        {/* PIE CHART */}
                        {/* <div className="card card-danger">
                          <div className="card-header">
                            <h3 className="card-title">Pie Chart</h3>
                          </div>
                          <div className="card-body">
                            <canvas
                              id="pieChart"
                              style={{ height: "250px", maxWidth: "100%" }}
                            ></canvas>
                          </div>
                        </div> */}
                      </div>

                      <div className="col-md-6">
                        {/* LINE CHART */}
                        {/* <div className="card card-info">
                          <div className="card-header">
                            <h3 className="card-title">Line Chart</h3>
                          </div>
                          <div className="card-body">
                            <div className="chart">
                              <canvas
                                id="lineChart"
                                style={{ height: "250px", maxWidth: "100%" }}
                              ></canvas>
                            </div>
                          </div>
                        </div> */}

                        {/* AREA CHART */}
                        <div className="card card-primary">
                          <div className="card-header">
                            <h3 className="card-title">Revenue Chart</h3>
                          </div>
                          <div className="card-body">
                            <div className="chart">
                              <canvas
                                id="areaChart"
                                style={{ height: "250px", maxWidth: "100%" }}
                              ></canvas>
                            </div>
                          </div>
                        </div>

                        {/* BAR CHART */}
                        {/* <div className="card card-success">
                          <div className="card-header">
                            <h3 className="card-title">Bar Chart</h3>
                          </div>
                          <div className="card-body">
                            <div className="chart">
                              <canvas
                                id="barChart"
                                style={{ height: "250px", maxWidth: "100%" }}
                              ></canvas>
                            </div>
                          </div>
                        </div> */}

                        {/* STACKED BAR CHART */}
                        {/* <div className="card card-success">
                          <div className="card-header">
                            <h3 className="card-title">Stacked Bar Chart</h3>
                          </div>
                          <div className="card-body">
                            <div className="chart">
                              <canvas
                                id="stackedBarChart"
                                style={{ height: "250px", maxWidth: "100%" }}
                              ></canvas>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {/* -------------- Main row -------------- */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
