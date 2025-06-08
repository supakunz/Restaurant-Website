"use client";

import Tables from "../../tables/Tables";
// import foodData from "../../assets/all_menu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as foodService from "../../../services/foodService";

const ListPage = () => {
  const [food, setFood] = useState([]);
  const [fectData, setFectData] = useState(false);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    foodService
      .getAllfoods(token)
      .then((res) => {
        setFood(res.data.fooddata);
      })
      .catch((err) => console.log(err));
  }, [token, fectData]);
  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Food Lists</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/admin">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Lists</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Tables
          table={"All Food Lists DataTable"}
          header={["Image", "Name", "Price", "Category", "Action"]}
          food={food}
          buttonText={"Add Food"}
          path={"/addfood"}
          setFectData={setFectData}
          fectData={fectData}
        />
      </div>
    </>
  );
};

export default ListPage;
