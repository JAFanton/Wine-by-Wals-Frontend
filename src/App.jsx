import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Homepage";

function NavBar() {
  const { user, logout } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="p-4 bg-neutral-800 text-white flex justify-between">
      <Link to="/">Wine By Wals</Link>
      <div className="space-x-4">
        {!user ? (
          <>
            <button onClick={() => setShowSignup(true)} className="underline">Sign up</button>
            <button onClick={() => setShowLogin(true)} className="underline">Log in</button>
          </>
        ) : (
          <>
            <span className="mr-4">Hi, {user.name}</span>
            <button onClick={logout} className="underline">Log out</button>
          </>
        )}
      </div>

      {/* Auth Modals */}
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        openLogin={() => { setShowSignup(false); setShowLogin(true); }}
      />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        openSignup={() => { setShowLogin(false); setShowSignup(true); }}
      />
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* Example protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="p-8">My Dashboard</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}