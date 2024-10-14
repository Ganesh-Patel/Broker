import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login.jsx'; 
import Signup from './pages/Auth/Signup.jsx'; 
import ForgetPassword from './pages/Auth/ForgetPassword.jsx';
import VerifyEmail from './pages/Auth/ VerifyEmail.jsx'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/forgotpassword' element={<ForgetPassword />} />
            <Route path='/verifyemail' element={<VerifyEmail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
