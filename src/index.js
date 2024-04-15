import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import Hunting from "./pages/Hunting";
import IdInput from "./components/base/IdInput";
import { GlobalProvider } from './contexts/GlobalContext';
import { useEffect, useState } from "react";

//dapp
import { DAppProvider } from "@usedapp/core";
import NFTDetail from "./pages/NFTDetail";
import Login from "./pages/Login";

ReactDOM.render(
  <GlobalProvider>
    <DAppProvider config={{}}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/detail" element={<NFTDetail />} />
          <Route path="/hunting" element={<Hunting />} />
          {/* set id */}
          <Route path="/id-input" element={<IdInput />} />
        </Routes>
      </BrowserRouter>
    </DAppProvider>
  </GlobalProvider>,
  document.getElementById("root")
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
