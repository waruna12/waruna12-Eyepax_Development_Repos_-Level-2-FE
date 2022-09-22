import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  isLoggedIn: false, //CURRENT user login or not
  login: (token, userId) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialUserId = localStorage.getItem("userId");

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);

  const userIsLoggedIn = !!token; //not empty return true(have a token user is login)

  const loginHandler = (token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const contexValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contexValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
