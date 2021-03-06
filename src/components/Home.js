import React, {Component} from 'react'
import { connect } from 'react-redux'
import { deleteTicket } from '../actions/ticketActions'
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Home extends Component {
  
  render() {
    const { tickets, auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />

    const ticketList = tickets.length ? (
      tickets.map(ticket => {
        if (auth.uid === ticket.userId){
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
              <td><Link to={'/ticket/' + ticket.id}><button className="btn btn-primary edit-btn">Edit</button></Link></td>
            </tr>
          )
        } else {
          return null
        }
      })
    ) : (
      <tr>
        <td colSpan="13">
          <div class="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </td>
      </tr>
    )
    
    return(
      <div>
        <div className="text-center container page">
          <h1>Main Ticket Tracker</h1>
          <div className="table-responsive mt-4">
            <table className="table table-striped">
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
        <div className="fixed-action-btn">
          <button id="add-btn" data-toggle="modal" data-target="#myModal">
            <i className="material-icons">add</i>
          </button>
        </div> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if(state.firestore.ordered.tickets)
    {
      return{
        tickets: state.firestore.ordered.tickets,
        auth: state.firebase.auth
      }
    }
    else
    {
      return{
        tickets: '',
        auth: state.firebase.auth
      }
    }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    deleteTicket: (id) => { dispatch(deleteTicket(id)) }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'tickets', orderBy: ['enddate', 'asc'] }
  ])
)(Home)
