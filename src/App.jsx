import React, { useEffect, useState } from 'react'
// import { Route } from 'react-router-dom'

import Navbar from './components/pages/Navbar.jsx'
import { Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
// import Signup from './components/pages/Signup.jsx'
import Login from './components/pages/Login.jsx'
import About from './components/pages/About.jsx'
import MainPage from './components/pages/MainPage.jsx'
import ErrorPage from './components/pages/ErrorPage.jsx'
import CustomNavbar from './components/otherComponents/CustomNavbar.jsx'
import SignupPage from './components/otherComponents/Signup1.jsx'
import RefreshHandler from './RefreshHandler.jsx'


import ProblemList from './components/pages/ProblemList.jsx'
import ProblemDetails from './components/pages/ProblemDetails.jsx'
import Compiler1 from './components/otherComponents/Compiler1.jsx'
import AddProblemPage from './components/Adding/AddQuestion.jsx'
import ProfilePage from './components/pages/Profile.jsx'
import UpdateProblemPage from './components/Adding/UpdateProblem.jsx'
import AddTestCase from './components/Adding/AddTestcase.jsx'
import ForgotPassword from './components/forgotPassword/ForgotPassword.jsx'
function App() {




  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const [problems, setProblems] = useState([]);
  // const [userId, setuserId]= useState('')
  const [selectedProblem, setSelectedProblem] = useState(null);
  // const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl = import.meta.env.VITE_API_URL;



//   useEffect(() => {
//     async function fetchUserData() {
//         const username = localStorage.getItem('username');

//         if (username) {
//             try {
//                 const response = await fetch(`http://localhost:8000/User/${username}`);
                
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user data');
//                 }

//                 const data = await response.json();
//                 console.log('Fetched data:', data, 'User ID:', data._id);

//                 // Update Profile Schema with the fetched User ID
//                 try {
//                     const updateResponse = await fetch(`http://localhost:8000/Profile/${username}`, {
//                         method: 'PUT',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({ userId: data._id }) // Use fetched userId here
//                     });
//                     setuserId(data._id);
//                     if (!updateResponse.ok) {
//                         throw new Error('Failed to update profile');
//                     }
//                     const updatedData= await updateResponse.json()
//                     // console.log('Profile updated successfully',updatedData);
//                 } catch (error) {
//                     console.error('Error updating profile:', error);
//                 }

//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         }
//     }

//     fetchUserData()
// }, [])


  useEffect(() => {
    async function fetchProblems() {
      const headers={
        headers:{
          'Authorization':localStorage.getItem('token')
        }
      }
      const response = await fetch(`${apiUrl}/Problems`,headers);
      const data = await response.json();
      setProblems(data);
    }

    fetchProblems();
  }, [setIsAuthenticated]);

  //   const handleLogout = () => {
  //     // Handle logout logic
  //     setIsAuthenticated(true);
  // };
  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <CustomNavbar />
      {/* <Navbar />    */}

      <Routes>
        <Route path='/'  element={<Home />} />
        {/* <Route path='/MainPage'  element={IsAuthenticated?<MainPage/>:<Home />} /> */}
        <Route path='/About' element={<About />} />
        <Route path='/Login' element={<Login />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/Signup' element={<SignupPage />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />


        <Route path='/Compiler' element={IsAuthenticated ? <Compiler1 /> : <Login />} />
        <Route path='/AddProblems' element={IsAuthenticated ? < AddProblemPage /> : < Home />} />
        <Route path='/Mainpage' element={IsAuthenticated ? <MainPage /> : <Login />} />
        <Route path='/Profile' element={IsAuthenticated ? <ProfilePage  /> : <Login />} />
        <Route path='/UpdateProblem/:id' element={IsAuthenticated ? <UpdateProblemPage /> : <Login />} />
        <Route path='/AddTestCases/:id' element={IsAuthenticated ? <AddTestCase /> : <Login />} />


        <Route
          path='/Problems'
          element={
            IsAuthenticated ? (
              <div className="container mt-5">
                <div className="row">
                  <ProblemList problems={problems} selectProblem={setSelectedProblem} />
                </div>
              </div>
            ) : (
              // <Navigate to="/Login" />
              <Login/>
            )
          }
        />
        <Route
          path='/Problems/:id'
          element={
            IsAuthenticated ? (
              <div className="container mt-5">
                <div className="row">
                  <ProblemDetails problems={problems} />

                </div>
              </div>
            ) : (
              // <Navigate to="/Login" />
              <Login/>
            )
          }
        />
      </Routes>



    </>
  )
}

export default App



