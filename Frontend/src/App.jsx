import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
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
import PayRent from './pages/PayRent/PayRent.jsx';
import PaymentHistory from './pages/PaymentHistory/PaymentHistory.jsx';
import { UserContext } from './context/UserContext.jsx';
import MyBookings from './pages/MyBooking/MyBookings.jsx';

function App() {
  const{user,setIsLoggedIn,setUser,setLoading}=useContext(UserContext);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgetPassword />} />
            <Route path="/verifyemail" element={<VerifyEmail />} />
            <Route 
              path="/properties" 
              element={<Properties />} 
            />

            {/* Protected Routes */}
            <Route 
              path="/create-listing" 
              element={<ProtectedRoute><CreateListing /></ProtectedRoute>} 
            />
            <Route 
              path="/listing/:listingId" 
              element={<ProtectedRoute><Listing /></ProtectedRoute>} 
            />
            <Route 
              path="/properties" 
              element={<ProtectedRoute><Properties /></ProtectedRoute>} 
            />
            <Route 
              path="/wishlist" 
              element={<ProtectedRoute><WishList /></ProtectedRoute>} 
            />
            <Route 
              path="/about" 
              element={<AboutUs />} 
            />
            <Route 
              path="/account" 
              element={<ProtectedRoute><AccountPage /></ProtectedRoute>} 
            />
            <Route 
              path="/payrent" 
              element={<ProtectedRoute><PayRent /></ProtectedRoute>} 
            />
            <Route 
              path="/payment-history" 
              element={<ProtectedRoute><PaymentHistory  /></ProtectedRoute>} 
            />
             <Route 
              path="/mybookings" 
              element={<ProtectedRoute><MyBookings  /></ProtectedRoute>} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;