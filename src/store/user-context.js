import React, { useState } from "react";

export const UserContext = React.createContext();

//provide information for deffirent compoent
export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  return (
    <UserContext.Provider value={[users, setUsers]}>
      {props.children}
    </UserContext.Provider>
  );
};
