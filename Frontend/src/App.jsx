import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login.jsx'; 
import Signup from './pages/Auth/Signup.jsx'; 
import ForgetPassword from './pages/Auth/ForgetPassword.jsx';
import VerifyEmail from './pages/Auth/ VerifyEmail.jsx'
import CreateListing from './pages/CreateListing/CreateListing.jsx';
import Listing from './pages/Listing/Listing.jsx';
import Properties from './pages/Properties/Properties.jsx';
import WishList from './pages/WishList/WishList.jsx';
import AboutUs from './pages/About/AboutUs.jsx';
import AccountPage from './pages/UserAccount/AccountPage.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path='*' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/forgotpassword' element={<ForgetPassword />} />
            <Route path='/verifyemail' element={<VerifyEmail />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/listing/:listingId' element={<Listing />} />
            <Route path='/properties' element={<Properties />} />
            <Route path='/wishlist' element={<WishList />} />
            <Route path='/about' element={<AboutUs/>} />
            <Route path='/account' element={<AccountPage/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
