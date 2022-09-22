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

  var hairCount = 0;
  var makeUpCount = 0;
  var facialCount = 0;

  for (var i = 0; i < newArray.length; ++i) {
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

  var pieChatDataSet = [];
  var hairObj = {};
  var makeObj = {};
  var facialObj = {};

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
            outerRadius={80}
            fill="#8884d8"
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
