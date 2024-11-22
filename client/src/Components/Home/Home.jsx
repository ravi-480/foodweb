import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";  // Import the CSS module

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1>
          <span>Cooking</span> with fun made easy and accessible
        </h1>
        <p>
          It's easy to use and offers a variety of recipes that appeal to
          beginners and experts alike. Ready to get cooking?
        </p>
        <div className={styles.exploreBtn}>
          <button>
            <Link to="/recipe">Get Started</Link>
          </button>
          <h3><Link to="/about">Learn More</Link></h3>
        </div>
        <div className={styles.taglineContainer}>
          <div className={styles.tagline}>
            <img src="/icons8-heart-16.png" alt="" />
            <h4>Inspired by thousands of delicious recipes</h4>
          </div>
          <div className={styles.tagline}>
            <img src="/icons8-star-64.png" alt="" />
            <h4>The winner of Apple Design Award</h4>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src="/hero.png" alt="" />
      </div>
    </div>
  );
};

export default Home;
