// import React, { useEffect, useState } from 'react'
// // import { Route } from 'react-router-dom'

// import Navbar from './components/pages/Navbar.jsx'
// import { Router, Routes, Route, Navigate } from 'react-router-dom'
// import Home from './components/pages/Home.jsx'
// // import Signup from './components/pages/Signup.jsx'
// import Login from './components/pages/Login.jsx'
// import About from './components/pages/About.jsx'
// import MainPage from './components/pages/MainPage.jsx'
// import ErrorPage from './components/pages/ErrorPage.jsx'
// import CustomNavbar from './components/otherComponents/CustomNavbar.jsx'
// import SignupPage from './components/otherComponents/Signup1.jsx'
// import RefreshHandler from './RefreshHandler.jsx'


// import ProblemList from './components/pages/ProblemList.jsx'
// import ProblemDetails from './components/pages/ProblemDetails.jsx'
// import Compiler1 from './components/otherComponents/Compiler1.jsx'
// import AddProblemPage from './components/Adding/AddQuestion.jsx'
// import ProfilePage from './components/pages/Profile.jsx'
// import UpdateProblemPage from './components/Adding/UpdateProblem.jsx'
// import AddTestCase from './components/Adding/AddTestcase.jsx'
// import ForgotPassword from './components/forgotPassword/ForgotPassword.jsx'
// import Admin from './components/otherComponents/Admin.jsx'
// function App() {




//   const [IsAuthenticated, setIsAuthenticated] = useState(false);
//   const [problems, setProblems] = useState([]);
//   // const [userId, setuserId]= useState('')
//   const [selectedProblem, setSelectedProblem] = useState(null);
//   // const apiUrl = process.env.REACT_APP_API_URL;
//   // const apiUrl = import.meta.env.VITE_API_URL;
//   const apiUrl = 'https://bcknd.codehub.org.in';






//   useEffect(() => {
//     async function fetchProblems() {
//       const headers={
//         headers:{
//           'Authorization':localStorage.getItem('token')
//         }
//       }
//       const response = await fetch(`${apiUrl}/Problems`,headers);
//       const data = await response.json();
//       setProblems(data);
//     }

//     fetchProblems();
//   }, [setIsAuthenticated]);

//   //   const handleLogout = () => {
//   //     // Handle logout logic
//   //     setIsAuthenticated(true);
//   // };
//   return (
//     <>
//       <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
//       <CustomNavbar />
//       {/* <Navbar />    */}

//       <Routes>
//         <Route path='/'  element={<Home />} />
//         {/* <Route path='/MainPage'  element={IsAuthenticated?<MainPage/>:<Home />} /> */}
//         <Route path='/About' element={<About />} />
//         <Route path='/Login' element={<Login />} />
//         <Route path='*' element={<ErrorPage />} />
//         <Route path='/Signup' element={<SignupPage />} />
//         <Route path='/ForgotPassword' element={<ForgotPassword />} />


//         <Route path='/Admin' element={IsAuthenticated ? <Admin /> : <Login />} />
//         <Route path='/Compiler' element={IsAuthenticated ? <Compiler1 /> : <Login />} />
//         <Route path='/AddProblems' element={IsAuthenticated ? < AddProblemPage /> : < Home />} />
//         <Route path='/Mainpage' element={IsAuthenticated ? <MainPage /> : <Login />} />
//         <Route path='/Profile' element={IsAuthenticated ? <ProfilePage  /> : <Login />} />
//         <Route path='/UpdateProblem/:id' element={IsAuthenticated ? <UpdateProblemPage /> : <Login />} />
//         <Route path='/AddTestCases/:id' element={IsAuthenticated ? <AddTestCase /> : <Login />} />


//         <Route
//           path='/Problems'
//           element={
//             IsAuthenticated ? (
//               <div className="container mt-5">
//                 <div className="row">
//                   <ProblemList problems={problems} selectProblem={setSelectedProblem} />
//                 </div>
//               </div>
//             ) : (
//               // <Navigate to="/Login" />
//               <Login/>
//             )
//           }
//         />
//         <Route
//           path='/Problems/:id'
//           element={
//             IsAuthenticated ? (
//               <div className="container mt-5">
//                 <div className="row">
//                   <ProblemDetails problems={problems} />

//                 </div>
//               </div>
//             ) : (
//               // <Navigate to="/Login" />
//               <Login/>
//             )
//           }
//         />
//       </Routes>



//     </>
//   )
// }

// export default App;


import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Home from './components/pages/Home.jsx';
import Login from './components/pages/Login.jsx';
import About from './components/pages/About.jsx';
import MainPage from './components/pages/MainPage.jsx';
import ErrorPage from './components/pages/Error/ErrorPage.jsx';
import CustomNavbar from './components/otherComponents/CustomNavbar.jsx';
import SignupPage from './components/otherComponents/Signup1.jsx';
import RefreshHandler from './RefreshHandler.jsx';
import ProblemList from './components/pages/ProblemList.jsx';
import ProblemDetails from './components/pages/ProblemDetails.jsx';
import Compiler1 from './components/otherComponents/Compiler1.jsx';
import AddProblemPage from './components/Adding/AddQuestion.jsx';
import ProfilePage from './components/Profile/Profile.jsx';
import UpdateProblemPage from './components/Adding/UpdateProblem.jsx';
import AddTestCase from './components/Adding/AddTestcase.jsx';
import TermsandCondition from './components/Pages1/TermsandCondition.jsx';
import { ThemeProvider } from './components/Themes/Themes.jsx';
import { AuthProvider, useAuth } from './components/Authentication/Authenticaton.jsx'; // Import useAuth if needed
import ContestPage from './components/otherComponents/Contest/AllContestName.jsx';
import ContestQuestions from './components/ContestQuestion/ContestQuestion.jsx';
import CreateContest from './components/CreateContestQuestion/CreateContestQuestion.jsx';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'; // Import CSS for styling
import NotificationProvider from './components/otherComponents/Notification/Notification.jsx';
import ShowContestQuestion from './components/otherComponents/ShowContestQst/ShowContestQuestion.jsx';
import Timer from './components/otherComponents/Timer/Timer.jsx';
import { TimerProvider } from './components/otherComponents/Timer/TimerContext.jsx';

import ForgotPassword from './components/forgotPassword/ForgotPassword.jsx'


function App() {
  const [problems, setProblems] = useState([]);
  // const { isAuthenticated } = useAuth(); // Use the Auth context to get the authentication state


//timer
const [timeLeft, setTimeLeft] = useState(600); // Set the initial timer (10 minutes)
const [timerActive, setTimerActive] = useState(false);
// const apiUrl='https://bcknd.codehub.org.in'
const apiUrl='http://localhost:3000';
  useEffect(() => {
    async function fetchProblems() {
      const headers={
                headers:{
                  'Authorization':localStorage.getItem('token')
                }
              }
              const response = await fetch(`${apiUrl}/Problems`,headers);
              // const data = await response.json();
              // setProblems(data);
      // const response = await fetch(apiUrl);
      const data = await response.json();
      setProblems(data);
    }

    fetchProblems();
  }, []);

  return (
  
    <ThemeProvider>
      <NotificationProvider>
    
        <ReactNotifications/>
      <AuthProvider>
        {/* <RefreshHandler /> */}
        <CustomNavbar />
        <TimerProvider>
        <Routes>
         <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Login' element={<Login />} />
          <Route path='*' element={<ErrorPage/>} />
          <Route path='/Signup' element={<SignupPage />} />
          <Route path='/Terms&conditions' element={<TermsandCondition />} />
          <Route path='/Problems' element={<ProblemList problems={problems}/>} />
          <Route path='/Compiler' element={<Compiler1/>} />
          <Route path='/AddProblems' element={ <AddProblemPage /> } />
          <Route path='/UpdateProblem/:id' element={<UpdateProblemPage /> } />
          <Route path='/AddTestCases/:id' element={ <AddTestCase /> } /> 
          <Route path='/Problems/:id' element={<ProblemDetails problems={problems} />}/>
          <Route path='/Profile' element={ <ProfilePage /> } /> 
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          {/* show all contests available */}
          <Route path='/contest' element={ <ContestPage  /> } /> 
          {/* her you can write code for questions */}
          <Route path='/ContestQuestions/:contestId/:Qtitle' element={ <ContestQuestions /> } /> 
{/* to creat contest */}
       <Route path='/CreateContest' element={<CreateContest/>}/>
       {/* show question of particular contest */}
       <Route path='/ShowContestQuestion/:id' element={<ShowContestQuestion />}/>
       <Route path='/ShowContestQuestion' element={<ShowContestQuestion />}/>
          
         
        </Routes>
        </TimerProvider>
        <ToastContainer />
      </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
