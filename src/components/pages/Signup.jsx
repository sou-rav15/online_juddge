import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import { HandleError, HandleSuccess } from '../../utils';

function Signup() {
  // const [msg, setMsg] =useState('');

  const [signupInfo, setsignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
    age: ''
  })
const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);

  }

  const handleSignup = async (e) => {
    e.preventDefault();
    // console.log(signupInfo);
    const{name,email,password,username,age}=signupInfo;
    if(!name|| !email|| !password|| !username|| !age){
        return HandleError('All field are required');
    }    

    try {
      const url = "http://localhost:8000/signup";
      console.log('connectinf to backend');
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo)
        // signupInfo

      });
      console.log('outside fetch');
      const result =await response.json();
      // console.log(result);
      const {success,message,error}=result;
if(success){
  HandleSuccess(message);
  setTimeout(()=>{
    navigate('/Login')
  },1000)
}

else if(error){
  const details=error?.details[0].message;
HandleError(details);
}
else if(!success){
  HandleError(message)
}
    } catch (error) {
      HandleError(error)

    }
  }

  return (
    


    <div className='formContainer'>
      <div className='formshadow'>
        <h1>SIGNUP</h1>

        <form onSubmit={handleSignup}>
          {/* name */}
          <div className='formBox' class="mb-3">
            <label for="name" class="form-label">NAME  </label>
            <input onChange={handleChange} type="text" class="form-control" name="name" placeholder="Enter Your Name" />
          </div>

          {/* eamil */}
          <div className='formBox' class="mb-3">
            <label for="email" class="form-label">EMAIL  </label>
            <input onChange={handleChange} type="email" class="form-control" name="email" placeholder="Enter Your Email" />
          </div>

          {/* age */}
          <div className='formBox' class="mb-3">
            <label for="age" class="form-label">AGE  </label>
            <input onChange={handleChange} type="number" class="form-control" name="age" placeholder="" />
          </div>
          {/*  username*/}
          <div className='formBox' class="mb-3">
            <label for="username" class="form-label">USERNAEME  </label>
            <input onChange={handleChange} type="text" class="form-control" name="username" placeholder="Enter Your Email" />
          </div>
          {/* password */}
          <div class="mb-3">
            <label for="password" class="form-label">PASSWORD</label>
            <input onChange={handleChange} type="password" class="form-control" name="password" placeholder="Enter Your Password" />
          </div>
          <div>
            <span>Already have an account?
              <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to={'/Login'}> login</NavLink>
            </span>
          </div>
          <div class="col-12">
            <button className='buttons' type="submit" class="btn btn-primary mt-2 mb-4">Sign up</button>
          </div>
        </form>
        <ToastContainer/>

      </div>

    </div>

  )
}

export default Signup

