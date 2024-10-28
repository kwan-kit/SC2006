import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Enhance Your Fitness Journey with Our Bespoke Running Plans</h1>
          <p>Tailored for all fitness levels. Reach new heights with personalised goals, real-time tracking, and dynamic recommendations.</p>
          <button className="cta-button">Start Your Journey</button>
        </div>
      </section>

      {/* Running Plan Section */}
      <section className="running-plan">
        <div className="content">
          <div className="text">
            <h2>Your Personalised Running Plan</h2>
            <p>Our Running Plan can be tailored to suit all fitness levels, whether you're a beginner or an experienced runner looking to push your limits.</p>
            <p>With personalised goals, real-time progress tracking, and dynamic recommendations, you’ll find the perfect balance between challenge and achievement.</p>
            <button className="cta-button">Explore Running Plans</button>
          </div>
          <div className="image">
            <div className="loading-placeholder">Image Placeholder</div>
          </div>
        </div>
      </section>

      {/* Hybrid Plan Section */}
      <section className="hybrid-plan">
        <div className="content">
          <div className="image">
            <div className="loading-placeholder">Image Placeholder</div>
          </div>
          <div className="text">
            <h2>Elevate Your Training with the Hybrid Plan</h2>
            <p>The Hybrid Plan integrates tailored gym sessions with personalised running goals, giving you the ultimate edge to conquer both aspects of your fitness.</p>
            <p>Optimise your performance and achieve your desired results with a personalised timeline designed to help you reach your goals - right on time.</p>
            <button className="cta-button">Explore Hybrid Plans</button>
          </div>
        </div>
      </section>

      {/* New Feature: Optimized Running Routes */}
      <section className="route-planner">
        <div className="content">
          <div className="text">
            <h2>Generate Optimized Running Routes</h2>
            <p>Plan custom running routes around Singapore based on your preferences. Integrated with Google Maps, you can explore the best running tracks tailored just for you.</p>
            <p>Get personalized recommendations to make your running experience enjoyable and efficient, whether you're exploring new areas or optimizing your daily route.</p>
            <button className="cta-button">Plan Your Route</button>
          </div>
          <div className="image">
            <div className="loading-placeholder">Map Placeholder</div>
          </div>
        </div>
      </section>

      {/* New Feature: Gym Capacity Tracker */}
      <section className="gym-capacity">
        <div className="content">
          <div className="image">
            <div className="loading-placeholder">Gym Capacity Placeholder</div>
          </div>
          <div className="text">
            <h2>Real-time Gym Capacity Tracker</h2>
            <p>Stay updated with real-time gym capacity data in Singapore. Find the best time to hit the gym without the crowd and make the most out of your workout sessions.</p>
            <p>View gym availability, current capacity, and plan your workout ahead of time.</p>
            <button className="cta-button">Check Gym Availability</button>
          </div>
        </div>
      </section>

      {/* New Feature: Personalized Gym Workout Plans */}
      <section className="gym-plans">
        <div className="content">
          <div className="text">
            <h2>Custom Gym Workout Plans</h2>
            <p>Get personalized gym workout plans based on your fitness goals. Whether you're focusing on strength, endurance, or flexibility, we have the perfect plan for you.</p>
            <p>Monitor your progress, adjust your goals, and stay motivated with dynamic recommendations tailored to your specific needs.</p>
            <button className="cta-button">Get Your Custom Workout Plan</button>
          </div>
          <div className="image">
            <div className="loading-placeholder">Workout Plan Placeholder</div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Real-time Tracking</h3>
            <p>Track your pace and distance instantly with accurate feedback.</p>
          </div>
          <div className="feature-card">
            <h3>Dynamic Recommendations</h3>
            <p>Get tailored advice based on your performance to improve every time.</p>
          </div>
          <div className="feature-card">
            <h3>Personalized Goals</h3>
            <p>Set achievable targets and surpass them with ease.</p>
          </div>
          <div className="feature-card">
            <h3>Route Visualization</h3>
            <p>Map your running routes and assess your journey every step of the way.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Achieve Your Goals?</h2>
        <p>Start your running journey today and discover just how far you can go.</p>
        <button className="cta-button">Get Started Now</button>
      </section>
    </div>
  );
};

export default LandingPage;
