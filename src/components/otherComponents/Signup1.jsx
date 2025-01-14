// // SignupPage.js

// import React, { useState } from 'react';
// import { Container, Form, Button, Alert } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './SignupPage.css';  // Import custom CSS file

// import { NavLink, useNavigate } from 'react-router-dom'
// import { ToastContainer} from 'react-toastify';
// import { HandleError, HandleSuccess } from '../../utils';

// const SignupPage = () => {
//   // const apiUrl = import.meta.env.VITE_API_URL;
//   const apiUrl = 'https://bcknd.codehub.org.in';
//     const [signupInfo, setsignupInfo] = useState({
//         name: '',
//         age: '',
//         username: '',
//         email: '',
//         password: ''
//     });
//     const navigate=useNavigate()
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       console.log(name, value);
//       const copysignupInfo = { ...signupInfo };
//       copysignupInfo[name] = value;
//       setsignupInfo(copysignupInfo);
  
//     }
   

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         console.log(signupInfo);
//         const{name,email,password,username,age}=signupInfo;
//         if(!name|| !email|| !password|| !username|| !age){
//             return HandleError('All field are required');
//         }    
    
//         try {
//           const url = `${apiUrl}/signup`;
//           console.log('connectinf to backend');
//           const response = await fetch(url, {
//             method: "POST",
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(signupInfo)
//             // signupInfo
    
//           });
//           console.log('outside fetch');
//           const result =await response.json();
//           // console.log(result);
//           const {success,message,error,userId}=result;
//     if(success){
//       HandleSuccess(message);
//       setTimeout(()=>{
//         navigate('/Login')
//       },1000)
//     }
    
//     else if(error){
//       const details=error?.details[0].message;
//     HandleError(details);
//     }
//     else if(!success){
//       HandleError(message)
//     }
//         } catch (error) {
//           HandleError(error)
    
//         }
//       }
    

//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">Sign Up</h2>
//             <Form onSubmit={handleSignup} className="form-container">
//                 <Form.Group controlId="formName">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter your name"
//                         name="name"
//                         // value={signupInfo.name}
//                         onChange={handleChange}
//                         required
//                         className="input-field"
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formAge">
//                     <Form.Label>Age</Form.Label>
//                     <Form.Control
//                         type="number"
//                         placeholder="Enter your age"
//                         name="age"
//                         // value={signupInfo.age}
//                         onChange={handleChange}
//                         required
//                         className="input-field"
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formUsername">
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter your username"
//                         name="username"
//                         // value={signupInfo.username}
//                         onChange={handleChange}
//                         required
//                         className="input-field"
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                         type="email"
//                         placeholder="Enter your email"
//                         name="email"
//                         // value={signupInfo.email}
//                         onChange={handleChange}
//                         required
//                         className="input-field"
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                         type="password"
//                         placeholder="Enter your password"
//                         name="password"
//                         // value={signupInfo.password}
//                         onChange={handleChange}
//                         required
//                         className="input-field"
//                     />
//                 </Form.Group>


//                 {/* <div>
//             <span>Already have an account?
//               <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to={'/Login'}> login</NavLink>
//             </span>
//           </div> */}

//                 <button  type="submit" className="w-100 buttons">
//                     Sign Up
//                 </button>

//                 {/* {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
//                 {success && <Alert variant="success" className="mt-3">{success}</Alert>} */}

  
// <div className="mt-4 text-center">
//                             <p className="mb-0">Already have an account?</p>
//                             <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to="/login" className="btn btn-link">Log In</NavLink>
//                         </div>
//                 <ToastContainer/>
//             </Form>
            

//         </Container>
//     );
// };

// export default SignupPage;



import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignupPage.css';  // Import custom CSS file
import { useAuth } from '../Authentication/Authenticaton.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HandleError, HandleSuccess } from '../../utils';
import { useTheme } from '../Themes/Themes.jsx';

const SignupPage = () => {
    const { isAuthenticated } = useAuth(); 
    const [signupInfo, setsignupInfo] = useState({
        name: '',
        age: '',
        username: '',
        email: '',
        password: '',
        gender: '' // Add gender field to the signup info
    });
    const { isDark } = useTheme();
    const [checkBox, setCheckBox] = useState(false);
    // const apiUrl = 'https://bcknd.codehub.org.in';
    const apiUrl = import.meta.env.VITE_API_URL
    const handleCheckBox = () => {
        setCheckBox(prevCheckBox => !prevCheckBox);
    };

    useEffect(() => {
        console.log(checkBox);
    }, [checkBox]);

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copysignupInfo = { ...signupInfo };
        copysignupInfo[name] = value;
        setsignupInfo(copysignupInfo);
    };

    const handleSignup = async (e) => {
        console.log(signupInfo);
        
        e.preventDefault();
        const { name, email, password, username, age, gender } = signupInfo;
        if (!checkBox) {
            return HandleError('You must accept the terms and conditions', isDark);
        }
        if (!name || !email || !password || !username || !age || !gender) {
            return HandleError('All fields are required', isDark);
        }

        try {
            const url = `${apiUrl}/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                HandleSuccess(message, isDark);
                setTimeout(() => {
                    navigate('/Login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                HandleError(details, isDark);
            } else {
                HandleError(message, isDark);
            }
        } catch (error) {
            HandleError(error, isDark);
        }
    }
    if (isAuthenticated) {
        navigate('/Problems');
        return null; // Prevent rendering until navigation occurs
    }
    
    return (
        <div className='parent-box'>
            <div className='form-shadow'>
                <Container className="mt-5">
                    <h2 className='fontStyles'>Sign Up</h2>
                    <Form onSubmit={handleSignup} className="form-container">
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </Form.Group>

                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter your age"
                                name="age"
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </Form.Group>

                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                name="username"
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </Form.Group>

                        {/* Gender Selection */}
                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    label="Male"
                                    name="gender"
                                    value="Male"
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    label="Female"
                                    name="gender"
                                    value="Female"
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    label="Other"
                                    name="gender"
                                    value="Other"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </Form.Group>

                        <div className="form-check checkbuttons">
                            <input
                                className="form-check-input inputcheck"
                                type="checkbox"
                                checked={checkBox}
                                id="flexCheckDefault"
                                onChange={handleCheckBox}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                I agree to the
                                <span>
                                    <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to="/Terms&conditions" className="btn btn-link">terms and conditions</NavLink>
                                </span>
                            </label>
                        </div>

                        <button className="buttons mt-2" type="submit">
                            Sign Up
                        </button>

                        <div className="mt-0 text-center">
                            <p className="mb-0">Don't have an account?</p>
                            <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to="/login" className="btn btn-link">Log In</NavLink>
                        </div>
                        <ToastContainer />
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default SignupPage;

