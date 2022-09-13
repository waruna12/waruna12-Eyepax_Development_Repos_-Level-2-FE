import React, { useState } from "react";

export const ReservationContext = React.createContext();

//provide information for deffirent compoent
export const ReservationProvider = (props) => {
  const [reservation, setReservationContext] = useState([]);

  return (
    <ReservationContext.Provider value={[reservation, setReservationContext]}>
      {props.children}
    </ReservationContext.Provider>
  );
};
