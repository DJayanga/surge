import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import AuthContext from "./context/AuthContext";


function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
      {loggedIn === false && (
          <>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />    
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path='/profile' element={<Profile/>} />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default Router;