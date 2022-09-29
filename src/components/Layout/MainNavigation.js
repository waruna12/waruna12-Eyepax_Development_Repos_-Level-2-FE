import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import InviteNewUser from "./../../components/StartingPage/InviteNewUser";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/auth");
  };

  return (
    <Navbar bg="dark" variant="dark" fluid>
      <Container fluid>
        <Navbar.Brand href="/">Salon Booking App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Nav>
            {!isLoggedIn && (
              <Button variant="light" href="/auth">
                Login
              </Button>
            )}
            {isLoggedIn && <InviteNewUser />}
            {isLoggedIn && (
              <Button variant="light" onClick={logoutHandler}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
