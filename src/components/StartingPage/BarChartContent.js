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

const BarChartContent = (props) => {
  const [row, setRow] = useState([]);

  const ReservationDetails = async () => {
    try {
      const result = await ReservationService.reservationDetails();

      setRow(result);
    } catch (err) {}
  };

  useEffect(() => {
    ReservationDetails();
  }, []);

  var hairCount = 0;
  var makeUpCount = 0;
  var facialCount = 0;

  for (var i = 0; i < row.length; ++i) {
    if (row[i].service_type == "HairCut") {
      hairCount++;
    } else if (row[i].service_type == "MakeUp") {
      makeUpCount++;
    } else if (row[i].service_type == "Facial") {
      facialCount++;
    }
  }

  // My object
  const hair = {
    label: "HairCut",
    value: hairCount,
  };

  const makeup = {
    label: "MakeUp",
    value: makeUpCount,
  };

  const facial = {
    label: "Facial",
    value: facialCount,
  };

  var nietos = [];
  var hairObj = {};
  var makeObj = {};
  var facialObj = {};

  hairObj["name"] = hair.label;
  hairObj["value"] = hair.value;

  makeObj["name"] = makeup.label;
  makeObj["value"] = makeup.value;

  facialObj["name"] = facial.label;
  facialObj["value"] = facial.value;

  nietos.push(hairObj);
  nietos.push(makeObj);
  nietos.push(facialObj);

  return (
    <BarChart
      width={400}
      height={400}
      data={nietos}
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
