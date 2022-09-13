import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteReservation from "./DeleteReservation";
import UpdateReservation from "./UpdateReservation";
// import { status } from "./../../data";
import { ReservationService } from "./../../services/ReservationService";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ReservationContext } from "./../../store/reservation-context";

const ReservationTable = () => {
  const [reservation, setReservationContext] = useContext(ReservationContext);
  const [reservationId, setReservationId] = useState("");
  // const [reservation_state, setReservation] = useState("");
  const [reservationUpdate, setReservationUpdate] = useState(false);

  const newArray = reservation.map((u) => {
    return {
      ...u,

      id: u._id,
    };
  });

  const ReservationDetails = async () => {
    try {
      const result = await ReservationService.reservationDetails();
      setReservationContext(result);
    } catch (err) {}
  };

  useEffect(() => {
    ReservationDetails();
    setReservationUpdate(false);
  }, [reservationUpdate]);

  const onClick = () => {
    ReservationDetails();
  };

  const columns = [
    { field: "client_email", headerName: "Client", width: 180 },
    { field: "service_type", headerName: "Service Type", width: 150 },
    { field: "stylist_email", headerName: "Stylist", width: 170 },
    { field: "reservation_date", headerName: "Date", width: 120 },
    { field: "reservation_time", headerName: "Time", width: 100 },
    { field: "reservation_status", headerName: "Status", width: 100 },
    // {
    //   field: "reservation_status",
    //   headerName: "Status",
    //   width: 130,
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <div
    //         onClick={() => {
    //           setReservationId(params.row.id);
    //         }}
    //       >
    //         <select
    //           name=""
    //           required
    //           value={params.row.reservation_status}
    //           onChange={(e) => {
    //             setReservation(e.target.value);
    //           }}
    //         >
    //           <option value={""}>select</option>

    //           {status.map((sta, index) => {
    //             return (
    //               <option key={sta.id} value={sta.title}>
    //                 {sta.title}
    //               </option>
    //             );
    //           })}
    //         </select>
    //       </div>
    //     );
    //   },
    // },
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
            <UpdateReservation
              reservationId={reservationId}
              onUpdateReservationData={setReservationUpdate}
            />
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
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Row
        style={{
          height: "50vh",
          width: "100%",
          marginTop: "2vh",
        }}
      >
        <DataGrid rows={newArray} columns={columns} />
      </Row>
    </Container>
  );
};

export default ReservationTable;
