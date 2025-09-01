import { useEffect , useRef, useState} from 'react'
import ReactDOM from "react-dom/client";
 import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CandlestickSeries, createChart  } from 'lightweight-charts';
import './App.css'
import axios from 'axios';
import SignIn from './pages/signinn';
import Trade from './pages/trade';
import SignUp from './pages/signup';

function App() {
  
  return <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Trade/>} />
        <Route path='signin' element={<SignIn/>} />
        <Route path='signup' element={<SignUp/>} />

      </Routes>
    </BrowserRouter>
    {/* <SignUp/> */}
    {/* <SignIn/> */}
    {/* <Trade/>npm  */}
  </>
}

export default App
