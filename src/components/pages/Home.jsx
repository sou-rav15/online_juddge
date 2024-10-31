// import React from 'react';
// import './Homepage.css';
// import { useNavigate } from 'react-router-dom';

// function HomePage() {
//   const navigate = useNavigate();
//   const handleButton=(e)=>{
// e.preventDefault();
// navigate('/Login');
//   }
//   return (
//     <div className="homepage">
//       {/* Header */}
//       <header className="header">
//         <h1>Welcome to codeHub.com</h1>
//         <p>Your one-stop hub for coding practice and challenges.</p>
//       </header>

//       {/* Quotes Section */}
//       <section className="quotes">
//         <blockquote>
       
//           "Try until your last try, and make each attempt your first try.." 
//         </blockquote>
//         <blockquote>
//           "If you’re trying, why not do it with CodeHub.com? 
//         </blockquote>
//         <div class="h-100 d-flex align-items-center justify-content-center">
//           <button onClick={handleButton} class='home-buttons'>Get Started</button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; 2024 codeHub.com. All rights reserved.</p>
//         <p> Made By Sourav Saran.</p>
//       </footer>
//     </div>
//   );
// }

// export default HomePage;


// import React from 'react';
// import './Homepage.css';

// import { useNavigate } from 'react-router-dom';

// function HomePage() {
//   const navigate = useNavigate();
//   const handleButton=(e)=>{
// e.preventDefault();
// navigate('/Login');

// const isAuthenticated = !!localStorage.getItem('token');
// console.log("Is authenticated: ", isAuthenticated);
//   useEffect(() => {
//     if (isAuthenticated) {
//       console.log("Redirecting to /problems");
//       navigate('/Problems');
//     }
//   }, [isAuthenticated, navigate]);

//   }
//   return (
//     <div className="homepage">
//       {/* Header */}
//       <header className="header">
//         <h1>Welcome to codeHub.com</h1>
//         <p>Your one-stop hub for coding practice and challenges.</p>
//       </header>

//       {/* Quotes Section */}
//       <section className="quotes">
//         <blockquote>
       
//           "Try until your last try, and make each attempt your first try.." 
//         </blockquote>
//         <blockquote>
//           "If you’re trying, why not do it with CodeHub.com? 
//         </blockquote>
//         <div class="h-100 d-flex align-items-center justify-content-center">
//           <button onClick={handleButton} class='home-buttons'>Get Started</button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; 2024 codeHub.com. All rights reserved.</p>
//         <p> Made By Sourav Saran.</p>
//       </footer>
//     </div>
//   );
// }

// export default HomePage;




import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/Authenticaton'; 

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
 
  const handleCreateAccount = (e) => {
    e.preventDefault();
    navigate('/signup'); // Navigate to the signup page
  };

  if (isAuthenticated) {
    navigate('/Problems');
    return null; // Prevent rendering until navigation occurs
}
  return (
    <div className="homepage">
      {/* Main Content Section */}
      <div className="main-content">
        {/* Left Side - Rotated Box */}
        <div className="rotated-box">
          <h1>Welcome to CodeHub.com!</h1>
          <p>Your one-stop hub for coding practice and challenges.</p>
        </div>

        {/* Right Side - Quotes and Button */}
        <div className="text-section">
          <h2>Quotes to Inspire:</h2>
          <blockquote className="quote">
            "Try until your last try, and make each attempt your first try."
          </blockquote>
          <blockquote className="quote">
          "If you're willing to try, why not utilize CodeHub.com?"
          </blockquote>
          <div className="button-container">
            <button onClick={handleCreateAccount} className="create-account-button">Create Account</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 codeHub.com. All rights reserved.</p>
        <p> Made By Sourav Saran.</p>
      </footer>
    </div>
  );
}

export default HomePage;
