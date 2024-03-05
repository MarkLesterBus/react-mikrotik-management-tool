
import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./components/navigation";
import { Routes, Route, useParams, Outlet } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/devices/dashboard";
import Devices from "./pages/devices/index";
import Vouchers from "./pages/vouchers";
import FAQs from "./pages/faqs";
import About from "./pages/about";
import SVG from "./components/svg";
import Accounts from "./pages/accounts";
import Hotspot from "./pages/hotspot";
import IP from "./pages/ip";
import Interfaces from "./pages/interfaces";
import Main from "./pages/devices/main";
import ErrorPage from "./pages/devices/error";
import Firewall from './pages/firewall';
import Students from './pages/students';

function App() {
  const { uuid } = useParams();

  return (
    <div id="App" className="min-vh-100">
      <SVG />
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} errorElement={ErrorPage} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/devices" element={<Devices />} />
        <Route exact path="/accounts" element={<Accounts />} />
        <Route exact path="/devices/:uuid/" element={<Main uuid={uuid} />} >
          {/* <Route exact path="*" element={<ErrorPage />} /> */}
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route exact path="interfaces" element={<Interfaces />} />
          <Route exact path="ip" element={<IP />} />
          <Route exact path="hotspot" element={<Hotspot />} />
          <Route exact path="vouchers" element={<Vouchers />} />
          <Route exact path="firewall" element={<Firewall />} />
          <Route exact path="students" element={<Students />} />

        </Route>

        <Route path="faqs" element={<FAQs />} />
        <Route path="about" element={<About />} />

      </Routes>
    </div>
  );
}

export default App;
