import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { ClientProvider } from "./store/client-context";
import { UserProvider } from "./store/user-context";
import { ReservationProvider } from "./store/reservation-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ClientProvider>
      <UserProvider>
        <ReservationProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReservationProvider>
      </UserProvider>
    </ClientProvider>
  </AuthContextProvider>
);
