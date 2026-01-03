import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/signinn';
import Trade from './pages/trade';
import SignUp from './pages/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Trade />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
