import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-3">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item mr-3">
                <NavLink className="nav-link" to="/daily-tracker">Daily Tracker</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/add-ticket">Create Ticket</NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <div className="fixed-action-btn">
        <button id="add-btn" data-toggle="modal" data-target="#myModal">
          <i className="material-icons">add</i>
        </button>
      </div> 
    {/* <NavLink to="/add-ticket" id="add-btn"><i class="material-icons">add</i></NavLink> */}
    </div>
  )
}

export default Navbar