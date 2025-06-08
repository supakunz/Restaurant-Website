import Tables from "../../tables/Tables";

const OrderPage = () => {
  const order = [
    {
      id: "9f519262-d841-474a-83de-1ef01b",
      date: "December 29, 2024 at 1:00 PM",
      total: "133.56",
      status: "complete",
    },
  ];
  return (
    <>
      <div className="content-wrapper overflow-hidden">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Orders</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/admin">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Orders</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Tables
          table={"All Orders Lists DataTable"}
          header={["OrderID", "Date", "Totals", "Status", "Action"]}
          order={order}
        />
      </div>
    </>
  );
};

export default OrderPage;
