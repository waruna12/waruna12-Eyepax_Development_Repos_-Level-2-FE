import classes from "./ClientPageContent.module.css";
import ClientTable from "./ClientTable";
import AddClientModel from "./AddClientModel";

const ClientPageContent = () => {
  return (
    <section className={classes.starting}>
      <h4>Welcome Client page</h4>
      <div className={classes.header}>
        {/* <button className={classes.button}>Add New Client</button> */}
        <AddClientModel />
      </div>
      <div className={classes.maincontent}>
        <ClientTable />
      </div>
    </section>
  );
};

export default ClientPageContent;
