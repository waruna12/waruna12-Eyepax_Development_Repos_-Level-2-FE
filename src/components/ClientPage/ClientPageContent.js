import React, { useState } from "react";
import classes from "./ClientPageContent.module.css";
import ClientTable from "./ClientTable";
import AddClientModel from "./AddClientModel";
import { NotificationContainer } from "react-notifications";

const ClientPageContent = () => {
  const [newclientadd, setNewClientAdded] = useState(false);

  // const saveExpenseDataHadler = (enterdata) => {};

  return (
    <section className={classes.starting}>
      <h4>Welcome Client page</h4>
      <div className={classes.header}>
        <AddClientModel onSaveClientData={setNewClientAdded} />
      </div>
      <div className={classes.maincontent}>
        <ClientTable newClient={newclientadd} />
      </div>
      <NotificationContainer />
    </section>
  );
};

export default ClientPageContent;
