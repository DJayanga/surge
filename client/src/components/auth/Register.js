import axios from "axios";
import React, { useContext, useState } from "react";
 import { useNavigate  } from "react-router-dom";
 import AuthContext from "../../context/AuthContext";

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerified, setPasswordVerified] = useState("");

   const { getLoggedIn } = useContext(AuthContext);
   const history = useNavigate ();

    async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        fullName,
        email,
        userName,
        password,
        passwordVerified,
      };

       await axios.post("http://localhost:5000/auth/", registerData);

       await getLoggedIn();
       history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Register a new account</h1>
      <form onSubmit={register}>

      <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
        />
        <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />

        <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
        />

        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />
        <input
            type="password"
            placeholder="Verify your password"
            onChange={(e) => setPasswordVerified(e.target.value)}
            value={passwordVerified}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;