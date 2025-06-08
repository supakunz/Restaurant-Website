import React from "react";
import Adduser from "../adduser/page";

const EditUser = async ({ params }) => {
  const id = (await params).id;
  return (
    <>
      <Adduser id={id} />
    </>
  );
};

export default EditUser;
