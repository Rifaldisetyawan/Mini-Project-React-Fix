import React,{useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './component/Home'
import Login from './component/Login';
import Register from './component/Register'


function App() {
  const [logoutUser, setLogout]=useState(false)
  return (
    <Router>
      <div className="App">
        <Routes>
          
        <Route exact path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login setLogout={setLogout} />}></Route>
            <Route path='/register' element={<Register setLogout={setLogout} />}></Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
