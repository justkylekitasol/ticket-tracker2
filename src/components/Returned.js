import React, {Component} from 'react'
import { connect } from 'react-redux'
import { deleteTicket } from '../actions/ticketActions'
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

let ret = "Returned";
class Returned extends Component {
  getReturns () {
    const { tickets, auth } = this.props;
    let Returns = tickets.filter(ticket => {
      if ( auth.uid === ticket.userId) {
        return (
          ticket.status === ret
        )
      } else return 0
    })
    return Returns.length
  }
  getTotal () {
    const { tickets, auth } = this.props;
    let Total = tickets.filter(ticket => {
      if ( auth.uid === ticket.userId) {
        return (
          ticket.ticketnumber
        )
      } else return 0
    })
    return Total.length
  }
  getAccuracy (length) {
    let total = length;
    const { tickets, auth } = this.props;
    let Returns = tickets.filter(ticket => {
      if ( auth.uid === ticket.userId) {
        return (
          ticket.status === ret
        )
      } else return 0
    })
    let percent = (Returns.length / total) * 100
    let accuracy = 100 - percent
    if (Returns.length === 0 && total === 0) {
      return 0
    } else return accuracy
  }
  render() {
    
    const { tickets, auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    
    const ticketList = this.getReturns() ? (
      tickets.map(ticket => {
        if (ticket.status === "Returned" && auth.uid === ticket.userId){
          return (
            <tr className="ticket" key={ticket.id}>
              <td>{ ticket.datecomplete }</td>
              <td>{ ticket.ticketnumber }</td>
              <td>{ ticket.website }</td>
              <td>{ ticket.remarks }</td>
              <td>{ ticket.skill }</td>
              <td><button className="btn btn-danger delete-btn" onClick={() => {this.props.deleteTicket(ticket.id, ticket.skill)}}>Delete</button></td>
              <td><Link to={'/ticket/' + ticket.id}><button className="btn btn-primary edit-btn">Edit</button></Link></td>
            </tr>
          )
        } else {
          return null
        }
      })
    ) : (
      <tr>
        <td colSpan="11">
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
        <div className="container page">
          <h1 className="text-center">Returned Cases</h1>
          <div className="row">
            <div className="col-md-3 mt-4">
              <div className="card bg-success text-white p-3">
                <h4>Complete Total: { this.getTotal() }</h4>
                <h4>Returns Total: { this.getReturns() }</h4>
                <h4>Accuracy: { Math.floor(this.getAccuracy(this.getTotal())) + '%' }</h4>
              </div>
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
        USday: state.ticket.USday,
        regulartickets: state.ticket.regulartickets,
        migrations: state.ticket.migrations,
        auth: state.firebase.auth
      }
    }
    else
    {
      return{
        tickets: state.ticket.tickets,
        USday: state.ticket.USday,
        regulartickets: state.ticket.regulartickets,
        migrations: state.ticket.migrations,
        auth: state.firebase.auth
      }
    }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    deleteTicket: (id, skill) => { dispatch(deleteTicket(id, skill)) }
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'tickets', orderBy: ['enddate', 'asc'] }
  ])
)(Returned)
