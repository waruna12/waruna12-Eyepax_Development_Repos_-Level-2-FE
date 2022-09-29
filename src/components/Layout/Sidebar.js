import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";

const Sidebar = () => {
  return (
    <ProSidebar style={{ height: "91vh" }}>
      <Menu iconShape="square">
        <MenuItem>
          Dashboard
          <Link to="/" />
        </MenuItem>
        <MenuItem>
          Clients
          <Link
            to={{
              pathname: `/${"Clients_Section"}`,
              state: { stateParam: true },
            }}
          />
        </MenuItem>
        <MenuItem>
          Reservations
          <Link
            to={{
              pathname: `/${"Reservations_Section"}`,
              state: { stateParam: true },
            }}
          />
        </MenuItem>
        <MenuItem>
          Calendar
          <Link
            to={{
              pathname: `/${"Calendar_Section"}`,
              state: { stateParam: true },
            }}
          />
        </MenuItem>
        <SubMenu title="Profile">
          <MenuItem>
            Change Password
            <Link to="/profile" />
          </MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
