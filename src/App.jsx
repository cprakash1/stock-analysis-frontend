import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Stocks from "./components/Stocks/Stocks";
import Knowledge from "./components/Knowledge/Knowledge";
import About from "./components/About/About";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import Cookies from "js-cookie";

const App = () => {
  axios.defaults.withCredentials = true;

  const check_cookie_is_alive = async () => {
    const expiryDate = new Date(Cookies.get("token"));
    if (expiryDate < new Date()) {
      // Token is expired
      return true;
    }
    return false;
  };

  const login = async (email, password) => {
    const { data } = await axios.post("http://localhost:3000/api/users/login", {
      email,
      password,
    });
    console.log(data, "app.jsx code");
  };

  const logout = () => {
    axios.post("http://localhost:3000/api/users/logout");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;