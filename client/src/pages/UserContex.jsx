import {createContext, useEffect, useState} from "react";
import axios from "axios";
import React from "react";
export const UserContext = createContext({});
export function UserContextProvider({children}) {
  const [Username, setUsername] = useState(null);
  const [Id, setId] = useState(null);
  useEffect(() => {
    axios.get('/profile').then(response => {
      setId(response.data.userId);
      setUsername(response.data.Username);
    });
  }, []);
  return (
    <UserContext.Provider value={{Username, setUsername,Id, setId}}>
      {children}
    </UserContext.Provider>
  );
}