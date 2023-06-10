import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import {useSelector} from 'react-redux'
import Create from './pages/create/Create';
import BlogDetails from './pages/blogDetails/BlogDetails';


function App() {
  const {user} = useSelector((state) => state.auth)
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to='/login'/>} />
        <Route path="/register" element={!user ? <Register/> : <Navigate to='/'/>} />
        <Route path="/login" element={!user ? <Login/> : <Navigate to = '/'/>}/>
        <Route path="/create" element={<Create/>} />
        <Route path='/blogDetails/:id' element={user ? <BlogDetails /> : <Navigate to='/login' />} />
        <Route path='/updateBlog/:id' element={user ? <UpdateBlog /> : <Navigate to='/login' />} />

      </Routes>
    </Router>
  );
}

export default App;
