import Image from "next/image";
import ActionBtn from "../actionBtn/ActionBtn";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { removeFoodID } from "../../services/foodService";
import { removeUserID } from "../../services/userService";

const TableRow = ({ data, type, setFectData, fectData, globalFilter }) => {
  const sortedData = data.sort((a, b) => a.id - b.id); // เรียงจากน้อยไปมาก

  return (
    <>
      {type === "food" && (
        <DataTable
          value={data}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          sortMode="multiple"
          globalFilter={globalFilter} // เพิ่มการกรองทั่วโลก
          emptyMessage={<div className="text-center">No food available.</div>}
        >
          <Column
            field="image"
            header="Image"
            body={(rowData) => (
              <Image
                src={rowData.image}
                width={60}
                height={60}
                alt="Food Image"
                objectFit="cover"
                style={{ borderRadius: "50%" }}
              />
            )}
            sortable
          ></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column
            field="price"
            header="Price"
            body={(rowData) => <span>${rowData.price}</span>}
            sortable
          ></Column>
          <Column field="category" header="Category" sortable></Column>
          <Column
            header="Action"
            body={(rowData) => (
              <ActionBtn
                path="list"
                id={rowData.id}
                setFectData={setFectData}
                fectData={fectData}
                action={removeFoodID}
              />
            )}
          />
        </DataTable>
      )}
      {type === "order" && (
        <DataTable
          value={sortedData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          sortMode="multiple"
          globalFilter={globalFilter} // เพิ่มการกรองทั่วโลก
          emptyMessage={<div className="text-center">No order available.</div>}
        >
          <Column field="id" header="Id" sortable></Column>
          <Column field="date" header="Date" sortable></Column>
          <Column
            field="total"
            header="Total"
            body={(rowData) => <span>${rowData.total}</span>}
            sortable
          ></Column>
          <Column field="status" header="Status" sortable></Column>
        </DataTable>
      )}
      {type === "user" && (
        <DataTable
          value={data}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          sortMode="multiple"
          globalFilter={globalFilter} // เพิ่มการกรองทั่วโลก
          emptyMessage={<div className="text-center">No user available.</div>}
          sortField="id" // ฟิลด์ที่ต้องการเรียงลำดับเริ่มต้น
          sortOrder={1} // 1 สำหรับเรียงจากน้อยไปมาก, -1 สำหรับเรียงจากมากไปน้อย
        >
          <Column field="firstname" header="Firstname" sortable></Column>
          <Column field="lastname" header="Lastname" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="role" header="Role" sortable></Column>
          {/* เพิ่มคอลัมน์ปุ่ม Action */}
          <Column
            header="Action"
            body={(rowData) => (
              <ActionBtn
                path="users"
                id={rowData.sessionid}
                setFectData={setFectData}
                fectData={fectData}
                action={removeUserID}
              />
            )}
          />
        </DataTable>
      )}
    </>
  );
};

export default TableRow;
