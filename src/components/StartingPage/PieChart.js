import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import { data } from "../../data";
import { ReservationService } from "./../../services/ReservationService";

const PieChartContent = (props) => {
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
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={newArray}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  );
};

export default PieChartContent;
