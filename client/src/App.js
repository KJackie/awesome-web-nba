import "./styles/App.scss";
import Router from "./Router";
import { UserContextProvider } from "../src/context/UserContext";
import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  );
}

export default App;
