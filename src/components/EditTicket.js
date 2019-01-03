import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editTicket } from '../actions/ticketActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

var id;

class EditTicket extends Component {
  state = {
    datecomplete: this.props.ticket.datecomplete,
    month: this.props.ticket.month,
    week: this.props.ticket.week,
    Localday: this.props.ticket.Localday,
    start: this.props.ticket.start,
    end: this.props.ticket.end,
    theme: this.props.ticket.theme,
    ticketnumber: this.props.ticket.ticketnumber,
    website: this.props.ticket.website,
    remarks: this.props.ticket.remarks,
    status: this.props.ticket.status,
    skill: this.props.ticket.skill
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editTicket(id, this.state);
    this.props.history.push('/daily-tracker')
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    
    const ticket = this.props.ticket ? (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row text-center">
            <div className="form-group col-sm-4">
              <label htmlFor="datecomplete">Date Completed</label>
              <input type="text" id="datecomplete" className="form-control text-center" onChange={this.handleChange} defaultValue={this.props.ticket.datecomplete}/>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="month">Month</label>
              <input type="text" id="month" className="form-control text-center" onChange={this.handleChange} defaultValue={this.props.ticket.month}/>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="week">Week</label>
              <input type="text" id="week" className="form-control text-center" onChange={this.handleChange} defaultValue={this.props.ticket.week}/>
            </div>
          </div>
          <div className="row text-center mt-5">
            <div className="col-sm-4">
              <button type="button" className="btn btn-success" disabled>Start Time</button>
              <input type="text" id="start" className="form-control mt-2 text-center" onChange={this.handleChange} defaultValue={this.props.ticket.start}/>
            </div>
            <div className="col-sm-4">
              <button type="button" className="btn btn-danger" disabled>End Time</button>
              <input type="text" className="form-control mt-2 text-center" id="end" defaultValue={this.props.ticket.end} onChange={this.handleChange}/>
            </div>
            <div className="col-sm-4">
            <button type="button" className="btn btn-primary" disabled>Duration</button>
              <p>00:00:00</p>
            </div>
          </div>
          <div className="row text-center mt-5">
            <div className="form-group col-sm-3">
              <label htmlFor="theme">Theme</label>
              <input type="text" id="theme" className="form-control text-center" onChange={this.handleChange} defaultValue={this.props.ticket.theme}/>
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="ticketnumber">Ticket Number</label>
              <input type="text" id="ticketnumber" className="form-control text-center" onChange={this.handleChange} required defaultValue={this.props.ticket.ticketnumber}/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" className="form-control text-center" onChange={this.handleChange} required defaultValue={this.props.ticket.website}/>
            </div>
          </div>
          <div className="row text-center mt-5">
            <div className="form-group col-sm-3">
              <label htmlFor="status">Status</label>
              <select id="status" className="form-control text-center" onChange={this.handleChange} required defaultValue={this.props.ticket.status}>
                <option value="Complete">Complete</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="skill">Skill</label>
              <select id="skill" className="form-control text-center" onChange={this.handleChange} required defaultValue={this.props.ticket.skill}>
                <option value="Regular Ticket">Regular Ticket</option>
                <option value="Migration">Migration</option>
              </select>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="remarks">Remarks</label>
              <input type="text" id="remarks" className="form-control text-center" onChange={this.handleChange} defaultValue={this.props.ticket.remarks}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-right">
              <button type="submit" className="btn btn-lg btn-success">Update</button>
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div className="container text-center">
        <h2>Loading Ticket..</h2>
      </div>
    )

    return (
      <div className="container page">
        <h2 className="text-center">Update Ticket</h2>
        { ticket }
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  id = ownProps.match.params.ticket_id;
  const tickets = state.firestore.data.tickets;
  const ticket = tickets ? tickets[id] : null
  return {
    ticket: ticket,
    auth: state.firebase.auth
  }
  // if(state.firestore.data.tickets)
  // {
  //   const ticket = state.firestore.data.tickets ? state.firestore.data.tickets[id] : null
  //   return{
  //     ticket: ticket
  //   }
  // }
  // else
  // {
  //   return{
  //     ticket: state.firestore.data.tickets.find((ticket) => {
  //       return ticket.id === id
  //     })
  //   }
  // }
}

const mapDispatchToProps = (dispatch) => {
  console.log(id)
  return  {
    editTicket: (id, ticket) => { dispatch(editTicket(id, ticket)) }
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'tickets' }
  ])
)(EditTicket)
