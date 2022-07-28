import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import DeleteReservation from "./DeleteReservation";
import UpdateReservation from "./UpdateReservation";
import { status } from "./../../data";

const rows = [
  {
    id: 1,
    First_Name: "Waruna",
    Last_Name: "Kulathuga",
    Phone_Number: "0779044891",
    Email: "waruna532@gmail.com",
  },
  {
    id: 2,
    First_Name: "kamak",
    Last_Name: "Kulathuga",
    Phone_Number: "0779044891",
    Email: "waruna532@gmail.com",
  },
  {
    id: 3,
    First_Name: "Ishara",
    Last_Name: "Kulathuga",
    Phone_Number: "0779044891",
    Email: "waruna532@gmail.com",
  },
];

const columns = [
  { field: "First_Name", headerName: "First Name", width: 150 },
  { field: "Last_Name", headerName: "Last Name", width: 150 },
  { field: "Phone_Number", headerName: "Phone Number", width: 150 },
  { field: "Email", headerName: "Email", width: 200 },
  {
    field: "Status",
    headerName: "Status",
    width: 150,
    sortable: false,
    renderCell: (params) => {
      return (
        <div>
          <select name="" required>
            <option value="">Select Status </option>
            {status.map((sta, index) => {
              return (
                <option key={sta.id} value={sta.id}>
                  {sta.title}
                </option>
              );
            })}
          </select>
        </div>
      );
    },
  },
  {
    field: "Edit",
    headerName: "Edit",
    width: 100,
    sortable: false,
    renderCell: (params) => {
      return (
        <div>
          <UpdateReservation />
        </div>
      );
    },
  },
  {
    field: "Delete",
    headerName: "Delete",
    width: 100,
    sortable: false,
    renderCell: (params) => {
      return (
        <div>
          <DeleteReservation />
        </div>
      );
    },
  },
];

const ReservationTable = () => {
  return (
    <>
      <div
        style={{
          height: 300,
          width: "80%",
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
};

export default ReservationTable;
