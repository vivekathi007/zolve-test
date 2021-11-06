import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import ApiResult from "./pages/ApiResult/ApiResult";
import Clipboard from "./pages/Clipboard/Clipboard";
import Selfie from "./pages/Selfie/Selfie";
function App() {
  return (
    <div className='App'>
      <header className='header'>
        <div className='banner'>
          <h1>Zolve</h1>
        </div>
        <div className='action'>
          <NavLink to='/'>
            API Result
          </NavLink>
          <NavLink to='/clipboard?name=abc'>
            Clipboard
          </NavLink>
          <NavLink to='/selfie'>
            Selfie
          </NavLink>
        </div>
      </header>
      <div className='container'>
        <Routes>
          <Route path='/' element={<ApiResult />} />
          <Route path='/clipboard' element={<Clipboard />} />
          <Route path='/selfie' element={<Selfie />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
