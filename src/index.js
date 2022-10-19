import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { UserProvider } from "./store/user-context";
import { ReservationProvider } from "./store/reservation-context";
import { ClientContextProvider } from "./store/client-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ClientContextProvider>
        <UserProvider>
          <ReservationProvider>
            <App />
          </ReservationProvider>
        </UserProvider>
      </ClientContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
