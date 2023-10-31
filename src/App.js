import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import DashboardPage from './Pages/DashboardPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkIsLoggedIn } from './redux/ActionCreators/authActionCreators';

function App() {

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkIsLoggedIn());
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/dashboard/*" element={<DashboardPage/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
