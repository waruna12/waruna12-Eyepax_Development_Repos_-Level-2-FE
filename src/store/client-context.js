import React, { useState } from "react";

const ClientContext = React.createContext({
  clients: [],
  allClientsCount: "",
  currentPage: 0,
  getAllClientDetails: () => {},
});

export const ClientContextProvider = (props) => {
  const [allClients, setAllClients] = useState([]);
  const [allClientCount, setAllClientCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);

  const getAllClientHandler = (result, page) => {
    setAllClientCount(result.clientCount);
    setAllClients(result.data);
    if (page === undefined) {
      setCurrentPage(0);
    } else {
      setCurrentPage(page);
    }
  };

  const contexValue = {
    clients: allClients,
    allClientsCount: allClientCount,
    currentPage: currentPage,
    getAllClientDetails: getAllClientHandler,
  };

  return (
    <ClientContext.Provider value={contexValue}>
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientContext;
