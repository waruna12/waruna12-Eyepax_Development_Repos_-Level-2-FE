import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import { ReservationService } from "./../../services/ReservationService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const PieChartContent = () => {
  const [row, setRow] = useState([]);

  const newArray = row.map((u) => {
    return {
      ...u,
      name: u.service_type,
      value: 1000,
    };
  });

  const completeReservation = async () => {
    try {
      const result = await ReservationService.completeReservation();

      setRow(result);
    } catch (err) {}
  };

  useEffect(() => {
    completeReservation();
  }, []);

  let hairCount = 0;
  let makeUpCount = 0;
  let facialCount = 0;

  for (let i = 0; i < newArray.length; ++i) {
    if (newArray[i].service_type === "HairCut") {
      hairCount++;
    } else if (newArray[i].service_type === "MakeUp") {
      makeUpCount++;
    } else if (newArray[i].service_type === "Facial") {
      facialCount++;
    }
  }

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

  let pieChatDataSet = [];
  let hairObj = {};
  let makeObj = {};
  let facialObj = {};

  hairObj["name"] = hair.label;
  hairObj["value"] = hair.value;

  makeObj["name"] = makeup.label;
  makeObj["value"] = makeup.value;

  facialObj["name"] = facial.label;
  facialObj["value"] = facial.value;

  pieChatDataSet.push(hairObj);
  pieChatDataSet.push(makeObj);
  pieChatDataSet.push(facialObj);

  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={pieChatDataSet}
            cx="50%"
            cy="50%"
            outerRadius={140}
            fill="#FFBB28"
            label
          />

          <Tooltip />
        </PieChart>
      </Row>
      <Row>
        <h6 style={{ display: "flex", justifyContent: "center" }}>
          All reservation made verses completed reservations
        </h6>
      </Row>
    </Container>
  );
};

export default PieChartContent;
