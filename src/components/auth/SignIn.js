import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../actions/authActions'
import { Redirect } from 'react-router-dom'
class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' />
    return (
      <div className="container page">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="shadow card">
              <div className="card-title bg-primary text-white p-3"><h3>Sign In</h3></div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Username:</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={this.handleChange}/>
                  </div>
                  <button type="submit" className="btn btn-success float-right">Login</button>
                  <div className="text-danger text-center">
                    { authError ? <p><b>{ authError }</b></p> : null }
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div> 
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)