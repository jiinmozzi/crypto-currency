import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import {useState, useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const auth = getAuth();
    
    onAuthStateChanged(auth, user => {
      if (user){
        const currentUser = auth.currentUser;
        setUser(currentUser);
      }
    })
  }, [])

  return (

        <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/trading/:id" element={<Trading />}></Route>
              <Route path="/balance" element={<Balance />}></Route>
              <Route path="/investment" element={<Investment />}></Route>
            </Route>
            <Route element={<AuthLayout/>}>
              <Route path="/auth" element={<Auth/>}></Route>  
            </Route>
            
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App;
