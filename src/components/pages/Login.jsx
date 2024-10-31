// import React, { useState } from 'react'
// import './login.css'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { ToastContainer} from 'react-toastify';
// import { HandleError, HandleSuccess } from '../../utils';

// function Login() {
//   // const apiUrl = import.meta.env.VITE_API_URL;
//   const apiUrl = 'https://bcknd.codehub.org.in';

//     const [LoginInfo, setLoginInfo] = useState({
  
//     email: '',
//     password: '',
 
   
   
//   })
// const navigate= useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // console.log(name, value);
//     const copyLoginInfo = { ...LoginInfo };
//     copyLoginInfo[name] = value;
//     setLoginInfo(copyLoginInfo);

//   }
 
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log('link is changed',apiUrl);
//     const{email,password,}=LoginInfo;
//     // console.log(email||username );
//     if( !email||!password){
//         return HandleError('All field are required');
//     }    

//     try {
//       const url = `${apiUrl}/login`;
//       // console.log('connectinf to backend');
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(LoginInfo)
//         // signupInfo

//       });
//       // console.log('outside fetch');
//       const result =await response.json();
//       // console.log(result);
//       const {success,message,jwtoken,name,error,username,userId}=result;
// if(success){
//   HandleSuccess(message);
//   localStorage.setItem('token',jwtoken);
//   localStorage.setItem('loggedInUser',name);
//   localStorage.setItem('username',username);
//   localStorage.setItem('userId',userId);
//   setTimeout(()=>{
//     navigate('/Problems')
//   },1000)
// }

// else if(error){
//   // const details=error?.details[0].message;
// const details="invalid inputs"
//   HandleError(details);
// }
// else if(!success){
//   HandleError(message)
// }
//     } catch (error) {
//       HandleError(error)

//     }
//   }

//   return (
//     <div>
// <div className='formContainer'>
//   <div className='formshadow'>
//   <h1>Log In</h1>

// <form onSubmit={handleLogin}>
//   <div className='formBox mb-3' class="mb-3">
// <label htmlFor="name" className="form-label">EMAIL  </label>
// <input onChange={handleChange} type="email"  className="form-control" name="email" placeholder="Enter Your Email"/>
// </div>
// <div className="mb-3">
// <label htmlFor="password" className="form-label">PASSWORD</label>
// <input onChange={handleChange} type="password"  className="form-control" name="password" placeholder="Enter Your Password"/>
// </div>
// <div>
// <span>Already have an account?
//               <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to={'/Signup'}> signup</NavLink>
//             </span>
// </div>

// <div className="col-12">
//     <button type="submit" className=" mt-2 mb-2  buttons">Sign in</button>
//   </div>
//   <div className='mb-3' >
//   <span>
   
//     <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to={'/ForgotPassword'}> Forgot Password?</NavLink>
//   </span>
// </div>

// </form>
// <ToastContainer/>

//   </div>

// </div>
    
     
//     </div>
//   )
// }

// export default Login


import React, { useEffect, useState } from 'react';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { HandleSuccess, HandleError } from '../../utils.js';
import { useAuth } from '../Authentication/Authenticaton.jsx'; // Adjust the import based on your file structure
import { useTheme } from '../Themes/Themes.jsx';
function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the Auth context
  const { isAuthenticated } = useAuth(); 
  const { isDark } = useTheme();
  const apiUrl = 'https://bcknd.codehub.org.in';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;

    if (!email || !password) {
      // return null;
      return HandleError('All fields are required', isDark);
    }

    try {
      // const url = "http://localhost:8000/login";
    const url = `${apiUrl}/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(LoginInfo),
      });

      const result = await response.json();
      const { success, message, jwtoken, name, username, userId, error, gender } = result;

      if (success) {
        // HandleSuccess(message);
        console.log('login succesfull');
        
        localStorage.setItem('token', jwtoken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);
        localStorage.setItem('gender', gender);
        
        // Call login from AuthContext to update auth state
        login();
        HandleSuccess('login succesfull', isDark);
        setTimeout(() => {
        
          navigate('/Problems');
         
        }, 1000);
      } else {
        HandleError(error||message || 'Invalid login details',isDark); 
      }
    } catch (error) {
      HandleError('An error occurred. Please try again.', isDark); 
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Problems'); // Only navigate when authentication is successful
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter Your Email'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter Your Password'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          <div className='signup-link'>
            <span>Already have an account? </span>
            <NavLink to='/Signup'>Sign up</NavLink>
          </div>
          <button type='submit' className='login-button'>Sign in</button>
             <div className='mb-3' >
  <span>
   
    <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to={'/ForgotPassword'}> Forgot Password?</NavLink>
   </span>
 </div>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Login;
