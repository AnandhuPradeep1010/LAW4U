import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase"; // adjust if needed

import "./Header.css";
import logo from "../../assets/Logolaw.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Law4U Logo" className="logo-image" />
          </Link>
        </div>
        <div className="brand-name">#Let's Grow Together</div>
        <div className="buttons">
          {!user ? (
            <>
              <Link to="/login">
                <button className="button">Login</button>
              </Link>
              <Link to="/signup">
                <button className="button">Sign Up</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/stats">
                <button className="button">Stats</button>
              </Link>
              <button className="button" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
