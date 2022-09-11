import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Containers/Layout";
import AuthLayout from "./Containers/AuthLayout";

import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Trading from "./Pages/Trading";
import Balance from "./Pages/Balance";
import Investment from "./Pages/Investment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/trading/:id" element={<Trading/>}></Route>
            <Route path="/balance" element={<Balance/>}></Route>
            <Route path="/investment" element={<Investment />}></Route>
          </Route>
          <Route element={<AuthLayout/>}>
            <Route path="/auth" element={<Auth/>}></Route>  
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
