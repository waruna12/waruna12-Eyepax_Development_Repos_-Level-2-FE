import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ClientPage from "./pages/ClientPage";
import AuthContext from "./store/auth-context";
import ReservationPage from "./pages/ReservationPage";
import CalenderPage from "./pages/CalenderPage";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/Auth/SignUp";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
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
          <Route path="/Clients_Section">
            <ClientPage />
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
    </Layout>
  );
}

export default App;
