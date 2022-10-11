import React, { useState, useEffect, useContext } from "react";
import { UserService } from "./../../services/UserService";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { UserContext } from "./../../store/user-context";

const InviteUser = () => {
  const [users, setUsers] = useContext(UserContext);

  const [searchvalue, setSearchValue] = useState("");

  let replaceSearchValue = searchvalue.replace(/\s+/g, "");

  const UserDetailSearch = async () => {
    try {
      const result = await UserService.userSearch(replaceSearchValue);
      setUsers(result);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (replaceSearchValue.length > 0) {
      UserDetailSearch();
    }
  }, [replaceSearchValue]);

  const UserDetails = async () => {
    try {
      const result = await UserService.userDetails();
      setUsers(result);
    } catch (err) {
      return err;
    }
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col sm={4}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search here"
              aria-label="Search here"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (e.target.value === "") {
                  UserDetails();
                }
              }}
            />
          </InputGroup>
        </Col>
        <Col sm={8} style={{ display: "flex", justifyContent: "end" }}></Col>
      </Row>
    </Container>
  );
};

export default InviteUser;
