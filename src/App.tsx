import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/signinn';
import Trade from './pages/trade';
import SignUp from './pages/signup';
import Wallet from './pages/Wallet';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import { Landing } from "./pages/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/deposit" element={<Wallet />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
