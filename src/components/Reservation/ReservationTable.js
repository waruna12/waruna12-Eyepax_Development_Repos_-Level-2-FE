import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteReservation from "./DeleteReservation";
import UpdateReservation from "./UpdateReservation";
import { status } from "./../../data";
import { ReservationService } from "./../../services/ReservationService";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const ReservationTable = (props) => {
  const [row, setRow] = useState([]);

  const [reservationId, setReservationId] = useState("");

  const [reservation_state, setReservation] = useState("");

  const newArray = row.map((u) => {
    return {
      ...u,

      id: u._id,
    };
  });

  const ReservationDetails = async () => {
    try {
      const result = await ReservationService.reservationDetails();

      setRow(result);
    } catch (err) {}
  };

  useEffect(() => {
    ReservationDetails();
    props.addClientStateChange(false);
  }, [props.onAddReservation]);

  const onClick = () => {
    ReservationDetails();
  };

  const columns = [
    { field: "client", headerName: "Client", width: 120 },
    { field: "service_type", headerName: "Service Type", width: 150 },
    { field: "stylist", headerName: "Stylist", width: 120 },
    { field: "reservation_date", headerName: "Date", width: 150 },
    { field: "reservation_time", headerName: "Time", width: 100 },
    {
      field: "reservation_status",
      headerName: "Status",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            onClick={() => {
              setReservationId(params.row.id);
            }}
          >
            <select
              name=""
              required
              value={params.row.reservation_status}
              onChange={(e) => {
                // console.log(e.target.value);
                setReservation(e.target.value);
                // onSubmitForm();
              }}
            >
              <option value={""}>select</option>

              {status.map((sta, index) => {
                return (
                  <option key={sta.id} value={sta.title}>
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
          <div
            onClick={() => {
              setReservationId(params.row.id);
            }}
          >
            <UpdateReservation reservationId={reservationId} />
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
          <div
            onClick={() => {
              setReservationId(params.row.id);
            }}
          >
            <DeleteReservation
              reservationId={reservationId}
              onClick={onClick}
            />
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
