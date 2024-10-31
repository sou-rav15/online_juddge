// // Navbar.js

// import React, { useEffect, useState } from 'react';
// import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer} from 'react-toastify';

// import { HandleSuccess } from '../../utils';
// // const onLogout = () => {

// // }
// // { isAuthenticated, onLogout }
// const CustomNavbar = () => {
//     const fontStyle={
//         fontFamily: "Kanit, sans-serif",
//         fontWeight: 700,
       
//     }

//     const navigate = useNavigate();
//     const [isAuthenticated, setisAuthenticated] = useState(false);
//     const onLogout = (e) => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('loggedInUser');
//         localStorage.removeItem('username');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('key');
//         // HandleSuccess("Log out succesfully");
        
//         setTimeout(() => {

//             navigate('/');
//         })
//     }
//     useEffect(() => {
//         if (localStorage.getItem('token')) {
//             setisAuthenticated(true)

//         }
//         else {
//             setisAuthenticated(false);
//         }
//     }, [isAuthenticated, onLogout])


//     // console.log("in navbar", isAuthenticated);
//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Container>
//                 <Navbar.Brand style ={fontStyle} > &lt;/&gt; 
//                      {/* as={Link} to="/"  */}
//                     CodeHub.com</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="mr-auto navbar-nav ms-auto mb-2 mb-lg-0 ">
//                         {isAuthenticated ? (
//                             <>
//                                 <Nav.Link as={Link} to="/Admin">Admin</Nav.Link>
//                                 <Nav.Link as={Link} to="/AddProblems">AddProblems</Nav.Link>
//                                 <Nav.Link as={Link} to="/Problems">Problems</Nav.Link>
//                                 <Nav.Link as={Link} to="/compiler">Compiler</Nav.Link>
//                                 <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
//                                 <Button variant="outline-light" onClick={onLogout}>Logout</Button>
//                             </>
//                         ) : (
//                             <>
//                                 <Nav.Link aria-current="page" as={Link} to="/">Home</Nav.Link>
//                                 <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                                 <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
//                             </>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//             <ToastContainer/>
//         </Navbar>
//     );
// };

// export default CustomNavbar;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container, Offcanvas } from 'react-bootstrap';
import { FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../Themes/Themes.jsx';
import { useAuth } from '../Authentication/Authenticaton.jsx'; // Adjust the path as necessary
import './CustomNavbar.css';
import { HandleError, HandleSuccess } from '../../utils.js';
import { useNotification } from './Notification/Notification.jsx';


const CustomNavbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth(); // Use the useAuth hook
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
//   const notify = useNotification();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // timer
  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  // };
  const onLogout = () => {
    HandleSuccess('succesfully logout', isDark);
    logout();
    navigate('/');
  };
  const apiUrl = 'https://bcknd.codehub.org.in';
//   const apiUrl = 'http://localhost:8000';
    const handleAdmin=async () => {
      const userId =localStorage.getItem('userId');
        // try {
        //     const url= `${apiUrl}/checkAdmin/${userId}`
        //     const response= await fetch(url);
        //     const result = await response.json();
        //     console.log(result);
        //     const {isAdmin, accessKey}=result;
        //     if(isAdmin){
        //         localStorage.setItem('key',accessKey) ;       
        //         HandleSuccess('You are the admin')  ;     
        //     }
        //     else{
        //         // console.log('false');
        //         // notify({
        //         //   title: "Success!",
        //         //   message: "This is a success message!",
        //         //   type: "success",
        //         // });
        //         HandleError('You are not the admin',isDark);
                
        //     }
        // } catch (error) {
            
        // }

        console.log('Admin button clicked');
        // Add functionality here, e.g., navigate to a different page or show a modal
    };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Update isAuthenticated state if necessary
      }
    };
    checkAuth(); // Check authentication on mount
  }, []);

  return (
    <Navbar bg={isDark ? 'dark' : 'light'} variant={isDark ? 'dark' : 'light'} expand="lg">
      <Container className='pt-1 pb-1'>
        {/* <div className='codehub'> */}
          
       
        <Link className="navbar-brand">CodeHub.com</Link>
        {/* </div> */}
     
        {/* <FestiveTheme holiday={'christmas'} /> */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          show={show}
          onHide={handleClose}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1">
              {isAuthenticated ? (
                <>
                  <Link to="/AddProblems" className="nav-link" onClick={handleClose}>Add Problems</Link>
                  <Link className="nav-link" onClick={handleAdmin}>Admin</Link>
                  <Link to="/Problems" className="nav-link" onClick={handleClose}>Problems</Link>
                  <Link to="/compiler" className="nav-link" onClick={handleClose}>Compiler</Link>
                  <Link to="/contest" className="nav-link contest" onClick={handleClose}>Contest</Link>
                  <div>
          {/* <h4 className={`timer ${timerActive ? 'text-warning' : 'text-primary'}`}>
          Time Left: {timerActive ? formatTime(timeLeft) : 'Not Started'}
        </h4> */}
          </div>
                  {/* <Link to="/CreateContest" className="nav-link contest" onClick={handleClose}>CreateContest</Link> */}
                </>
              ) : (
                <>
                  <Link to="/" className="nav-link" onClick={handleClose}>Home</Link>
                  <Link to="/login" className="nav-link" onClick={handleClose}>Login</Link>
                  <Link to="/signup" className="nav-link" onClick={handleClose}>Signup</Link>
                </>
              )}
            </Nav>
            <div className="navbar-controls">
              <Button variant="outline-secondary" onClick={toggleTheme}>
                {isDark ? <FaSun /> : <FaMoon />}
              </Button>
              {isAuthenticated && (
                <div className="profile-section">
                  <Link to="/Profile"  onClick={handleClose}><FaUserCircle className="profile-icon" /></Link>
                  
                  <button className=" logout-button"
                   onClick={onLogout}>Logout</button>
                </div>
              )}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
