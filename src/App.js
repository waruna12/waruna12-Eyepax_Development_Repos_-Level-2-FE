import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import MyProfile from "./components/MyProfile/MyProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ClientPage from "./pages/ClientPage";
import AuthContext from "./store/auth-context";
import ReservationPage from "./pages/ReservationPage";
import CalenderPage from "./pages/CalenderPage";
import AdminPage from "./pages/AdminPage";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/Auth/SignUp";
import Sidebar from "./components/Layout/Sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Container fluid style={{ paddingLeft: "0px", paddingRight: "0px" }}>
      <Layout>
        <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
          <Col sm={3} style={{ paddingLeft: "0px" }}>
            {authCtx.isLoggedIn && <Sidebar />}
          </Col>

          <Col sm={9} style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <Switch>
              {authCtx.isLoggedIn && (
                <Route path="/" exact>
                  <HomePage />
                </Route>
              )}
              {!authCtx.isLoggedIn && (
                <Route path="/auth" exact>
                  <AuthPage />
                </Route>
              )}
              {!authCtx.isLoggedIn && (
                <Route path="/auth/sign_up/:email/:token">
                  <SignUp />
                </Route>
              )}
              {authCtx.isLoggedIn && (
                <Route path="/profile">
                  <UserProfile />
                </Route>
              )}
              {authCtx.isLoggedIn && (
                <Route path="/myprofile">
                  <MyProfile />
                </Route>
              )}
              {authCtx.isLoggedIn && (
                <Route path="/Clients_Section">
                  <ClientPage />
                </Route>
              )}
              {authCtx.isLoggedIn && (
                <Route path="/Admin_Section">
                  <AdminPage />
                </Route>
              )}
              {authCtx.isLoggedIn && (
                <Route path="/Reservations_Section">
                  <ReservationPage />
                </Route>
              )}
              {authCtx.isLoggedIn && (
                <Route path="/Calendar_Section">
                  <CalenderPage />
                </Route>
              )}
            </Switch>
          </Col>
        </Row>
      </Layout>
    </Container>
  );
}

export default App;
