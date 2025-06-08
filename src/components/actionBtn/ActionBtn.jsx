import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

const ActionBtn = ({ id, path, setFectData, fectData, action }) => {
  const handleRemove = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
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
          await action(id)
            .then((res) => {
              Swal.close();
              console.log(res);
              Swal.fire({
                title: "Deleted Success!",
                text: "Your food has been deleted.",
                icon: "success",
              });
            })
            .catch((err) => {
              Swal.close();
              console.log(err);
              Swal.fire({
                title: "Deleted Faild!",
                text: err.response.data.message || "Error delete food.",
                icon: "error",
              });
            });
          setFectData(!fectData);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex" style={{ gap: "10px" }}>
      <Link
        href={`/admin/${path}/${id}`}
        className="btn btn-primary d-flex align-items-center"
        style={{ gap: "5px", borderRadius: "6px" }}
      >
        <i className="fas fa-edit" />
      </Link>
      <button
        className="btn btn-danger d-flex align-items-center"
        style={{ gap: "5px", borderRadius: "6px" }}
        onClick={handleRemove}
      >
        <i className="fas fa-trash-alt" />
      </button>
    </div>
  );
};

export default ActionBtn;
