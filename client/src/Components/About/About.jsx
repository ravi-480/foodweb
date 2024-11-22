import React from "react";
import "./About.css"; // Import the updated About.css

const About = () => {
  return (
    <div className="foodie-about-container">
      <div className="foodie-about-header">
        <h1>About Us</h1>
      </div>
      <div className="foodie-about-content">
        <section>
          <h2>Our Mission</h2>
          <p>
            Welcome to Foodie, where we make cooking fun, easy, and accessible for everyone. 
            Our mission is to provide delicious recipes that can be enjoyed by all, whether you're a beginner or an experienced cook.
          </p>
        </section>
        <section>
          <h2>Our Vision</h2>
          <p>
            At Foodie, we envision a world where everyone feels empowered to cook and enjoy homemade meals. 
            We believe that cooking should be a joyful experience and a means to bring people together.
          </p>
        </section>
        <section>
          <h2>Our Team</h2>
          <p>
            Our team is passionate about food and dedicated to helping you create amazing dishes. 
            We are constantly adding new recipes and tips to help you on your culinary journey. 
            Meet our team of professional chefs, home cooks, and food enthusiasts who work tirelessly to bring you the best recipes.
          </p>
        </section>
        <section>
          <h2>Join Our Community</h2>
          <p>
            Become a part of the Foodie community! Follow us on social media, subscribe to our newsletter, and share your cooking experiences with us.
            We love to see your creations and hear your feedback.
          </p>
          <button className="foodie-cta-button">Subscribe to our Newsletter</button>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>
            Have questions, suggestions, or feedback? We'd love to hear from you! 
            Get in touch with us via our contact form or email us at support@foodie.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
