import React from 'react'
import { Link } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item ml-3">
        <Link className="nav-link" to="/signin">Sign In</Link>
      </li>
      <li className="nav-item ml-3">
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </li>
    </ul>
  )
}

export default SignedOutLinks