import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteReservation from "./DeleteReservation";
import UpdateReservation from "./UpdateReservation";
import { ReservationService } from "./../../services/ReservationService";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ReservationContext } from "./../../store/reservation-context";

const ReservationTable = () => {
  const [reservation, setReservationContext] = useContext(ReservationContext);
  const [reservationId, setReservationId] = useState("");
  const [reservationUpdate, setReservationUpdate] = useState(false);

  const newArrayRow = reservation.map((u) => {
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
    { field: "client_email", headerName: "Client", flex: 2 },
    { field: "service_type", headerName: "Service Type", flex: 2 },
    { field: "stylist_email", headerName: "Stylist", flex: 2 },
    { field: "reservation_date", headerName: "Date", flex: 2 },
    { field: "reservation_time", headerName: "Time", flex: 2 },
    { field: "reservation_status", headerName: "Status", flex: 2 },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            onClick={() => {
              setReservationId(params.row.id);
            }}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <UpdateReservation
              reservationId={reservationId}
              onUpdateReservationData={setReservationUpdate}
            />
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
          width: "100%",
          marginTop: "2vh",
        }}
      >
        <DataGrid
          rows={newArrayRow}
          columns={columns}
          autoHeight
          hideFooter
          disableColumnMenu
        />
      </Row>
    </Container>
  );
};

export default ReservationTable;
