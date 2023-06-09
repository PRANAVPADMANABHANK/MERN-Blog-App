import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import {useSelector} from 'react-redux'
import Create from './pages/create/Create';

function App() {
  const {user} = useSelector((state) => state.auth)
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to='/login'/>} />
        <Route path="/register" element={!user ? <Register/> : <Navigate to='/'/>} />
        <Route path="/login" element={!user ? <Login/> : <Navigate to = '/'/>}/>
        <Route path="/create" element={<Create/>} />

      </Routes>
    </Router>
  );
}

export default App;
