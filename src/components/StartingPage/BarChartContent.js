import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ReservationService } from "./../../services/ReservationService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const BarChartContent = () => {
  const [stylistRow, setStylistRow] = useState([]);

  const eachStylistReservation = async () => {
    try {
      const result = await ReservationService.eachStylistReservationPerWeek();

      setStylistRow(result);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    eachStylistReservation();
  }, []);

  const newStylistArray = stylistRow.map((stylistData) => {
    return {
      ...stylistData,
      Stylist: stylistData._id,
      TotalHours: stylistData.value,
    };
  });

  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <BarChart
          width={400}
          height={400}
          data={newStylistArray}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={30}
        >
          <XAxis
            dataKey="Stylist"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="TotalHours"
            fill="#FFBB28"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </Row>
      <Row>
        <h6 style={{ display: "flex", justifyContent: "center" }}>
          Total time duration of each stylist.
        </h6>
      </Row>
    </Container>
  );
};

export default BarChartContent;
