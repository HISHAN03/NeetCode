import {useContext} from "react";
import {UserContext} from "./UserContex.jsx";
import React from "react"
import Logreg from "./loginANDregister.jsx";
import Home from "./home.jsx"
export default function Routes() {
  const {Username, Id} = useContext(UserContext);

  if (Username) {
    return <Home />;
  }

  return (
    <Logreg />
  );
}
