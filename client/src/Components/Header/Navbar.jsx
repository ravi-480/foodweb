import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false); // Is the user logged in?
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger menu state
  const [showProfileDetails, setShowProfileDetails] = useState(false); // Profile details toggle

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setProfile(true);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    setProfile(false);
    setShowProfileDetails(false); // Hide details on logout
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo2.png" alt="Logo" />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className={`${styles.pages} ${menuOpen ? styles.showMenu : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/recipe">Recipes</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/favourite">Favourite</Link>
        {profile && (
          <div
            className={styles.profile}
            onClick={() => setShowProfileDetails((prev) => !prev)}
          >
            <img src="/profile.png" alt="Profile" />
            {/* Profile dropdown for small screens */}
            {showProfileDetails && (
              <div className={styles.profileDetails}>
                <p>{localStorage.getItem("uname")}</p>
                <p>{localStorage.getItem("uemail")}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </nav>
  );
};

export default Navbar;
