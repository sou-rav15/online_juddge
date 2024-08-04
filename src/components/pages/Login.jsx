import React, { useState } from 'react'
import './login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import { HandleError, HandleSuccess } from '../../utils';

function Login() {

  const [LoginInfo, setLoginInfo] = useState({
  
    email: '',
    password: '',
 
   
   
  })
const navigate= useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);

  }
 
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(LoginInfo);
    const{email,password,}=LoginInfo;
    // console.log(email||username );
    if( !email||!password){
        return HandleError('All field are required');
    }    

    try {
      const url = "http://localhost:8000/login";
      // console.log('connectinf to backend');
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(LoginInfo)
        // signupInfo

      });
      // console.log('outside fetch');
      const result =await response.json();
      // console.log(result);
      const {success,message,jwtoken,name,error,username,userId}=result;
if(success){
  HandleSuccess(message);
  localStorage.setItem('token',jwtoken);
  localStorage.setItem('loggedInUser',name);
  localStorage.setItem('username',username);
  localStorage.setItem('userId',userId);
  setTimeout(()=>{
    navigate('/Problems')
  },1000)
}

else if(error){
  // const details=error?.details[0].message;
const details="invalid inputs"
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
    <div>
<div className='formContainer'>
  <div className='formshadow'>
  <h1>Login page</h1>

<form onSubmit={handleLogin}>
  <div className='formBox' class="mb-3">
<label for="name" class="form-label">EMAIL  </label>
<input onChange={handleChange} type="email"  className="form-control" name="email" placeholder="Enter Your Email"/>
</div>
<div class="mb-3">
<label for="password" class="form-label">PASSWORD</label>
<input onChange={handleChange} type="password"  className="form-control" name="password" placeholder="Enter Your Password"/>
</div>
<div>
<span>Already have an account?
              <NavLink style={{ textDecoration: 'none', listStyle: 'none' }} to={'/Signup'}> signup</NavLink>
            </span>
</div>
<div class="col-12">
    <button className='buttons'type="submit" class="btn btn-primary mt-2 mb-4">Sign in</button>
  </div>
</form>
<ToastContainer/>

  </div>

</div>
    
     
    </div>
  )
}

export default Login
