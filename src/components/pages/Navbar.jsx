import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'

import { NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0  ">
      {/* mb-2 mb-lg-0 */}
        <li class="nav-item mx-2">
          <NavLink style={{ textDecoration: 'none', color: 'black'}}  class="nav-link active text-center  " aria-current="page" to="/">Home</NavLink>
        </li>   
       
        
        <li class="nav-item mx-2">
          <NavLink style={{ textDecoration: 'none', color: 'black' }}   class="nav-link text-center  " to="/About">About</NavLink>
        </li>

        <li class="nav-item mx-2">
          <NavLink style={{ textDecoration: 'none', color: 'black' }}  class="nav-link text-center" to="/Login">Login</NavLink>
        </li>

        <li class="nav-item mx-2">
          <NavLink style={{ textDecoration: 'none', color: 'black' }}  class="nav-link text-center" to="/Signup">Register</NavLink>
        </li>
       
      </ul>
     
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
