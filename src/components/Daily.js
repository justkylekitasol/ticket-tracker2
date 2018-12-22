import React, {Component} from 'react'
import { connect } from 'react-redux'
import { deleteTicket } from '../actions/ticketActions'
import { Link } from 'react-router-dom'

class Daily extends Component {
  getSkill (skill) {
    let getSkill = skill
    let skills = this.props.tickets.filter(ticket => {
      if (this.props.USday + 1 === ticket.Localday || this.props.USday === ticket.Localday) {
        return (
          ticket.skill === getSkill
        )
      } else return 0
    })
    // console.log(skills)
    return skills.length
  }
  
  render() {
    const { tickets } = this.props;
    const ticketList = this.getSkill("Regular Ticket") || this.getSkill("Migration") ? (
      tickets.map(ticket => {
        if (this.props.USday + 1 === ticket.Localday || this.props.USday === ticket.Localday){
          return (
            <tr className="ticket" key={ticket.id}>
              <td>{ ticket.datecomplete }</td>
              <td>{ ticket.month }</td>
              <td>{ ticket.week }</td>
              <td>{ ticket.start }</td>
              <td>{ ticket.end }</td>
              <td>{ ticket.theme }</td>
              <td>{ ticket.ticketnumber }</td>
              <td>{ ticket.website }</td>
              <td>{ ticket.status }</td>
              <td>{ ticket.skill }</td>
              <td>{ ticket.remarks }</td>
              <td><button className="btn btn-danger delete-btn" onClick={() => {this.props.deleteTicket(ticket.id, ticket.skill)}}>Delete</button></td>
              <td><Link to={'/' + ticket.id}><button className="btn btn-primary edit-btn">Edit</button></Link></td>
            </tr>
          )
        } else {
          return null
        }
      })
    ) : (
      <tr>
        <td colSpan="11"><h3>No Tickets For Today</h3></td>
        <td></td>
        <td></td>
      </tr>
    )
    return(
      <div className="container page">
        <h1 className="text-center">Daily Ticket Tracker</h1>
        <button className="btn btn-success copy-btn" onClick={() => {this.props.copyFunction()}}>Copy</button>
        <div id="tableId">
          <h6>For this day, I accomplished { this.getSkill("Regular Ticket") } Regular Ticket/s and { this.getSkill("Migration") } Migration/s</h6>
          <div className="table-responsive">
            <table className="text-center table table-striped">
              <thead className="bg-primary">
                <tr>
                  <th>Date Completed</th>
                  <th>Month</th>
                  <th>Week</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Theme</th>
                  <th>Ticket Number</th>
                  <th>Website</th>
                  <th>Status</th>
                  <th>Skill</th>
                  <th>Remarks</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { ticketList }  
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
    USday: state.USday,
    regulartickets: state.regulartickets,
    migrations: state.migrations
  }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    deleteTicket: (id, skill) => { dispatch(deleteTicket(id, skill)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Daily)