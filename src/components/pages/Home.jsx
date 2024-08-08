import React from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const handleButton=(e)=>{
e.preventDefault();
navigate('/Login');
  }
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <h1>Welcome to codeHub.com</h1>
        <p>Your one-stop hub for coding practice and challenges.</p>
      </header>

      {/* Quotes Section */}
      <section className="quotes">
        <blockquote>
       
          "Try until your last try, and make each attempt your first try.." 
        </blockquote>
        <blockquote>
          "If you’re trying, why not do it with CodeHub.com? 
        </blockquote>
        <div class="h-100 d-flex align-items-center justify-content-center">
          <button onClick={handleButton} class='btn btn-primary'>Get Started</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 codeHub.com. All rights reserved.</p>
        <p> Made By Sourav Saran.</p>
      </footer>
    </div>
  );
}

export default HomePage;
