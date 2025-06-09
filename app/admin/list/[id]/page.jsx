import React from "react";
import Addfood from "../addfood/page";

const EditPage = async ({ params }) => {
  const id = (await params).id;
  return (
    <>
      <Addfood id={id} />
    </>
  );
};

export default EditPage;
