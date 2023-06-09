import {useContext} from "react";
import {UserContext} from "./UserContex.jsx";
import React from "react"
import Logreg from "./loginANDregister.jsx";
export default function Routes() {
  const {username, id} = useContext(UserContext);

  if (username) {
    return <h1>logged in</h1>;
  }

  return (
    <Logreg />
  );
}
