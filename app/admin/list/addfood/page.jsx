/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  getFoodID,
  addfoods,
  updateFoodID,
} from "../../../../services/foodService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Addfood = ({ id }) => {
  const router = useRouter();
  const [isProtected, setIsProtected] = useState(false);
  const [fectData, setFectData] = useState({});
  const [imageName, setImageName] = useState(null);
  const [foodData, setFoodData] = useState({
    name: "",
    price: "",
    category: "Select one",
    rate: "3",
    image: "/menu/noimage.jpg",
  });

  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  // ส่งภาพแบบ base64 ผ่าน JSON ไปยัง backend
  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImageName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFoodData({ ...foodData, image: reader.result });
    };
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
    // Add Food
    await addfoods(foodData)
      .then((res) => {
        console.log(res);
        Swal.close();
        Swal.fire("Add Success!", "", "success");
        setFoodData({
          name: "",
          price: "",
          category: "Select one",
          rate: "3",
        });
        router.push("/admin/list");
      })
      .catch((err) => {
        console.log(err);
        Swal.close();
        Swal.fire(
          "Add Faild!",
          err.response.data.message || "Error insert food",
          "error"
        );
        setFoodData({
          name: "",
          price: "",
          category: "Select one",
          rate: "3",
        });
      });
  };

  // ----------------------------- Edit Food -----------------------------
  //* Function get food from foodID
  const fectInfo = async () => {
    await getFoodID(id)
      .then((res) => setFectData(...res.data.fooddata))
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
    // Update Food
    await updateFoodID(id, foodData)
      .then((res) => {
        console.log(res);
        Swal.close();
        Swal.fire("Update Success!", "", "success");
        router.push("/admin/list");
      })
      .catch((err) => {
        console.log(err);
        Swal.close();
        Swal.fire(
          "Update Faild!",
          err.response.data.message || "Error updating food",
          "error"
        );
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
      setFoodData({
        name: fectData.name || "",
        price: fectData.price || "",
        category: fectData.category || "Select one",
        rate: fectData.rate || "3",
        image: fectData.image || "/menu/noimage.jpg",
      });
    }
  }, [id, fectData]);

  // เช็กว่าเป็น food หลักหรือไม่
  useEffect(() => {
    if (id && parseInt(id) < 43) {
      setIsProtected(true);
    }
  }, [id]);

  // ----------------------------- Edit Food -----------------------------

  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper" style={{ paddingBottom: "2rem" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Add New Food</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/admin">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/admin/list">Food List</a>
                  </li>
                  <li className="breadcrumb-item active">
                    {id ? "Edit Food" : "Add Food"}
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
                  <div className="card-header">
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
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={foodData.name}
                        onChange={handleChange}
                        disabled={isProtected}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Price</label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        className="form-control"
                        value={foodData.price}
                        onChange={handleChange}
                        disabled={isProtected}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category" name="category">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="form-control custom-select"
                        value={foodData.category}
                        onChange={handleChange}
                        disabled={isProtected}
                      >
                        <option selected disabled>
                          Select one
                        </option>
                        <option>Burger</option>
                        <option>Drink</option>
                        <option>Fried</option>
                        <option>Pizza</option>
                        <option>Steak</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="rate">Rate</label>
                      <input
                        id="rate"
                        name="rate"
                        type="range"
                        className="form-control-range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={foodData.rate} // กำหนดค่าให้ range
                        onChange={handleChange} // เรียกเมื่อมีการเปลี่ยนแปลงค่า
                        disabled={isProtected}
                      />
                      <p>
                        Selected Rate:{" "}
                        <span id="rate-value">{foodData.rate}</span>
                      </p>
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
                      <label for="customFile">Image File</label>
                      <div className="custom-file">
                        <input
                          onChange={imageHandler}
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                          disabled={isProtected}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          {imageName ? imageName : "Choose file"}
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Link href="/admin/list" className="btn btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-success float-right"
                  style={{ borderRadius: "6px" }}
                  disabled={isProtected}
                >
                  Add Food
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

export default Addfood;
