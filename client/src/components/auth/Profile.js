import axios from "axios";
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";

function Profile() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerified, setPasswordVerified] = useState("");

//   const { getLoggedIn } = useContext(AuthContext);
//   const history = useHistory();

    async function profile(e) {
    e.preventDefault();

    try {
      const updateData = {
        fullName,
        email,
        userName,
        password,
        passwordVerified,
      };

       await axios.post("http://localhost:5000/auth/", updateData);
//       await getLoggedIn();
//       history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Update account</h1>
      <form onSubmit={profile}>
        <label>Full Name</label>
        <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
        />
        <label>Email</label>
        <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />
        <label>User Name</label>
        <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
        />

        <label>Password</label>
        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />

        <label>Re-Type Password</label>
        <input
            type="password"
            placeholder="Verify your password"
            onChange={(e) => setPasswordVerified(e.target.value)}
            value={passwordVerified}
        />
        <button type="submit">Update</button>
        </form>
    </div>
  );
}

export default Profile;