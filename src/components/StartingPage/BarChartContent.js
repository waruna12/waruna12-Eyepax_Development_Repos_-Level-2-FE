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
import { data } from "../../data";
import { ReservationService } from "./../../services/ReservationService";

const BarChartContent = (props) => {
  const [row, setRow] = useState([]);

  const newArray = row.map((u) => {
    return {
      ...u,
      name: u.service_type,
      value: 1000,
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
  }, []);

  return (
    <BarChart
      width={400}
      height={400}
      data={newArray}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
  );
};

export default BarChartContent;
