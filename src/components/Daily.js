import React, {Component} from 'react'
import { connect } from 'react-redux'
import { deleteTicket } from '../actions/postActions'

class Daily extends Component {
  render() {
    console.log(this.props)
    const { tickets } = this.props;
    const ticketList = tickets.length ? (
      tickets.map(ticket => {
        if (this.props.USday + 1 === ticket.Localday || this.props.USday === ticket.Localday){
          // if (ticket.skill === "Regular Ticket"){
          //   this.props.regulartickets += 1;
          // }
          // if (ticket.skill === "Migration"){
          //   this.props.migrations += 1;
          // }
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
              <td><button className="btn btn-danger delete-btn" onClick={() => {this.props.deleteTicket(ticket.id)}}>Delete</button></td>
              <td><button className="btn btn-primary edit-btn">Edit</button></td>
            </tr>
          )
        } else {
          return null
        }
      })
    ) : (
      <div className="text-center">
        <h3>No Tickets for Today</h3>
      </div>
    )
    return(
      <div className="container mt-5">
        <h1 className="text-center">Daily Ticket Tracker</h1>
        <button className="btn btn-success copy-btn" onClick={() => {this.props.copyFunction()}}>Copy</button>
        <div id="tableId">
          <h6>For this day, I accomplished { this.props.regulartickets } Regular Tickets and { this.props.migrations } Migrations {this.props.USDay}</h6>
          <div className="table-responsive">
            <table className="text-center table">
              <thead>
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
    deleteTicket: (id) => { dispatch(deleteTicket(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Daily)