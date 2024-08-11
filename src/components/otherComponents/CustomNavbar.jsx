// Navbar.js

import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

import { HandleSuccess } from '../../utils';
// const onLogout = () => {

// }
// { isAuthenticated, onLogout }
const CustomNavbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const onLogout = async(e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('key');
        HandleSuccess("Log out succesfully");
        await Wait(500)
        setTimeout(() => {
            navigate('/');
        },500)
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setisAuthenticated(true)

        }
        else {
            setisAuthenticated(false);
        }
    }, [isAuthenticated, onLogout])


    // console.log("in navbar", isAuthenticated);
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand  > &lt;/&gt; 
                     {/* as={Link} to="/"  */}
                    CodeHub.com</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto navbar-nav ms-auto mb-2 mb-lg-0 ">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/Admin">Admin</Nav.Link>
                                <Nav.Link as={Link} to="/AddProblems">AddProblems</Nav.Link>
                                <Nav.Link as={Link} to="/Problems">Problems</Nav.Link>
                                <Nav.Link as={Link} to="/compiler">Compiler</Nav.Link>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Button variant="outline-light" onClick={onLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link aria-current="page" as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <ToastContainer/>
        </Navbar>
    );
};

export default CustomNavbar;
