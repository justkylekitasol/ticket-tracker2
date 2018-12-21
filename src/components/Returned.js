import React, {Component} from 'react'
import { connect } from 'react-redux'
import { deleteTicket } from '../actions/ticketActions'
import { Link } from 'react-router-dom'

class Returned extends Component {
  getReturns () {
    let ret = "Returned";
    let Returns = this.props.tickets.filter(ticket => ticket.status === ret).length
    return Returns
  }
  getAccuracy (length) {
    let ret = "Returned";
    let total = length;
    let Returns = this.props.tickets.filter(ticket => ticket.status === ret).length
    let percent = (Returns / total) * 100
    let accuracy = 100 - percent
    // console.log(percent)
    if (Returns === 0 && total === 0) {
      return 0
    } else return accuracy
  }
  render() {
    
    const { tickets } = this.props;
    const ticketList = tickets.length ? (
      tickets.map(ticket => {
        if (ticket.status === "Returned"){
          return (
            <tr className="ticket" key={ticket.id}>
              <td>{ ticket.datecomplete }</td>
              <td>{ ticket.ticketnumber }</td>
              <td>{ ticket.website }</td>
              <td>{ ticket.remarks }</td>
              <td>{ ticket.skill }</td>
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
        <td colSpan="11"><h3>No Returned Tickets</h3></td>
      </tr>
    )
    return(
      <div className="container page">
        <h1 className="text-center">Returned Cases</h1>
        <div className="row">
          <div className="col-md-3 mt-4">
            <h3>Complete Total: { tickets.length }</h3>
            <h3>Returns Total: { this.getReturns() }</h3>
            <h3>Accuracy: { Math.floor(this.getAccuracy(tickets.length)) + '%' }</h3>
          </div>
          <div className="col-md-9 mt-4">
            <div className="table-responsive">
              <table className="text-center table table-striped">
                <thead className="bg-primary">
                  <tr>
                    <th>Date</th>
                    <th>Ticket #</th>
                    <th>Link</th>
                    <th>Revisions/Edits</th>
                    <th>Task</th>
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
export default connect(mapStateToProps, mapDispatchToProps)(Returned)