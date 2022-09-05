import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
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

  var hairCount = 0;
  var makeUpCount = 0;
  var facialCount = 0;

  for (var i = 0; i < newArray.length; ++i) {
    console.log(newArray[i].service_type);
    if (newArray[i].service_type == "HairCut") {
      hairCount++;
    } else if (newArray[i].service_type == "MakeUp") {
      makeUpCount++;
    } else if (newArray[i].service_type == "Facial") {
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
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={nietos}
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
