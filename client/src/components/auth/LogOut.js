import axios from "axios";
import React, { useContext } from "react";
import { useNavigate  } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function LogOut() {
  const { getLoggedIn } = useContext(AuthContext);

   const history = useNavigate ();

  async function logOut() {
    await axios.get("http://localhost:5000/auth/logout");
    await getLoggedIn();
    history.push("/");
  }

  return <button onClick={logOut}>Log out</button>;
}

export default LogOut;