import React, { useState } from "react";

export const ClientContext = React.createContext();

//provide information for deffirent compoent
export const ClientProvider = (props) => {
  const [clients, setClients] = useState([]);

  return (
    <ClientContext.Provider value={[clients, setClients]}>
      {props.children}
    </ClientContext.Provider>
  );
};
