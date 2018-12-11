import React, {Component} from 'react'
import { connect } from 'react-redux'
import { deleteTicket } from '../actions/postActions'

class Home extends Component {
  // handleClick = () => {
  //   this.props.deleteTicket(ticket.id)
  // }
  render() {
    const { tickets } = this.props;
    const ticketList = tickets.length ? (
      tickets.map(ticket => {
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
            <td><button className="btn btn-danger" onClick={() => {this.props.deleteTicket(ticket.id)}}>Delete</button></td>
          </tr>
        )
      })
    ) : (
      <div className="text-center">
        <h3>No Tickets</h3>
      </div>
    )
    
    return(
      <div className="text-center container mt-5">
        <h1>Main Ticket Tracker</h1>
        <div className="table-responsive">
          <table className="table">
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
      
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets
  }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    deleteTicket: (id) => { dispatch(deleteTicket(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)