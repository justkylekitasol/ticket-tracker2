import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Daily from './components/Daily'
import { connect } from 'react-redux'
import AddTicket from './components/AddTicket'
import EditTicket from './components/EditTicket'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

class App extends Component {
  copyFunction () {
    let body = document.body, range, sel,
    table = document.getElementById('tableId');
      if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
          range.selectNodeContents(table);
          sel.addRange(range);
        } catch (e) {
          range.selectNode(table);
          sel.addRange(range);
        }
        document.execCommand("copy");

      } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(table);
        range.select();
        range.execCommand("Copy");
      }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="chat-app">
          <Navbar />
          <Switch>
            <Route exact path='/' render={()=> <Home/>}/>
            <Route path='/daily-tracker' render={()=> <Daily copyFunction={this.copyFunction}/>} />
            <Route path='/:ticket_id' component={EditTicket}/>
          </Switch>
          <div className="modal fade" id="myModal">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">Add Ticket</h2>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <AddTicket/>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="modal fade" id="editModal">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">Edit Ticket</h2>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <EditTicket/>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tickets: state.tickets
  }
}
export default connect(mapStateToProps)(App)
