import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteReservation from "./DeleteReservation";
import UpdateReservation from "./UpdateReservation";
import { status } from "./../../data";
import { ReservationService } from "./../../services/ReservationService";

const ReservationTable = () => {
  const [row, setRow] = useState([]);

  const newArray = row.map((u) => {
    return {
      ...u,

      id: u._id,
    };
  });

  const ReservationDetails = async () => {
    try {
      const result = await ReservationService.reservationDetails();

      console.log(result);
      setRow(result);

      setRow(result);
    } catch (err) {
      //toast
      // if (err.response.data.message !== undefined) {
      //   notifyWarning(err.response.data.message);
      // } else {
      //   notifyWarning("Somthing Wrong");
      // }
    }
  };

  useEffect(() => {
    ReservationDetails();
  }, []);

  const columns = [
    { field: "client", headerName: "Client", width: 120 },
    { field: "service_type", headerName: "Service Type", width: 150 },
    { field: "stylist", headerName: "Stylist", width: 120 },
    { field: "reservation_date", headerName: "Date", width: 150 },
    { field: "reservation_time", headerName: "Time", width: 100 },
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

  return (
    <>
      <div
        style={{
          height: 300,
          width: "80%",
        }}
      >
        <DataGrid rows={newArray} columns={columns} />
      </div>
    </>
  );
};

export default ReservationTable;
