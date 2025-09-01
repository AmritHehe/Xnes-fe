import { useEffect , useRef, useState} from 'react'

import { CandlestickSeries, createChart  } from 'lightweight-charts';
import './App.css'
import axios from 'axios';
import SignIn from './pages/signinn';
import Trade from './pages/trade';
import SignUp from './pages/signup';

function App() {
  
  return <>
    {/* <SignUp/> */}
    {/* <SignIn/> */}
    <Trade/>
  </>
}

export default App
