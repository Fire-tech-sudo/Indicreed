import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      {/* Background mapped to surface, min-h-screen added for full coverage, and selection contrast improved */}
      <div className="bg-surface text-on-surface font-body-md selection:bg-primary/30 selection:text-on-primary reveal-active min-h-screen pb-20 md:pb-0">
        {/* ToastContainer set to dark theme to match the cinematic vibe */}
        <ToastContainer position="bottom-right" theme="dark" />

        <Navbar />

        {/*{showLogin && <Login />}*/}
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/result" element={<Result />} />
          <Route path="/buycredit" element={<BuyCredit />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<Account />} />*/}
        </Routes>

        {/*<BottomNavbar />*/}
        <Footer />
      </div>
    </div>
  );
};

export default App;
