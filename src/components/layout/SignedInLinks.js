import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../actions/authActions'

const SignedInLinks = (props) => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item ml-3">
        <Link className="nav-link" to="/">Main Tracker</Link>
      </li>
      <li className="nav-item ml-3">
        <NavLink className="nav-link" to="/daily-tracker">Daily Tracker</NavLink>
      </li>
      <li className="nav-item ml-3">
        <Link className="nav-link" to="/returned">Returned</Link>
      </li>
      <li className="nav-item ml-3">
        <a className="nav-link signout" onClick={props.signOut}>Logout</a>
      </li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)