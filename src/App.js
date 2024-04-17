import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainSection from './components/MainSection/MainSection';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import UserProfile from './components/UserProfile/UserProfile';
import Markers from './components/Markers/Markers';
import Map from './components/Map/Map';
import { AuthProvider } from './components/Auth/AuthContext';

function App() {
  return (
      <Router>
        <AuthProvider>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<MainSection />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/markers" element={<Markers />} />
              <Route path="/map" element={<Map />} />
              <Route path="/user" element={<UserProfile />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
  );
}

export default App;
