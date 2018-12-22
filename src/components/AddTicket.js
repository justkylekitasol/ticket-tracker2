import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTicket } from '../actions/ticketActions'
class AddTicket extends Component {
  state = {
    datecomplete: '',
    Localday: '',
    month: '',
    week: '',
    start: '',
    end: '',
    duration: '',
    theme: '',
    ticketnumber: '',
    website: '',
    remarks: '',
    startdate: '',
    enddate: '',
    status: ''
  }
  addZeroinhours(i) {
    if (i < 10 && i !== 0) {
      i = "0" + i;
    } else if (i === 0) {
      i = 12;
    }
    return i;
  }
  addZeroinminutes(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  startTime = () => {
    let date = new Date(),
    hour = this.addZeroinhours(date.getHours()),
    minute = this.addZeroinminutes(date.getMinutes());
    if (hour > 12) {
      hour = hour - 12
      this.setState({
        start: hour + ':' + minute + " PM",
        startdate: date
      })
    } else {
      this.setState({
        start: hour + ':' + minute + " AM",
        startdate: date
      })
    }
  }
  endTime = () => {
    let date = new Date(),
    hour = this.addZeroinhours(date.getHours()),
    minute = this.addZeroinminutes(date.getMinutes());
    if (hour > 12) {
      hour = hour - 12
      this.setState({
        end: hour + ':' + minute + " PM",
        enddate: date
      })
    } else {
      this.setState({
        end: hour + ':' + minute + " AM",
        enddate: date
      })
    }
    this.duration(date)
  }
  duration = (enddate) => {
    let start = new Date(this.state.startdate.toLocaleString()),
    end = new Date(enddate.toLocaleString()),
    duration = Math.abs(end - start)/1000,
    minutes = Math.round(duration/60),
    hours = Math.round(minutes/60)
    this.setState({
      duration: hours + ":" + minutes + ":00"
    })
  }
  Localday() {
    let today = new Date().getDate()
    return(today)
  }
  Today() {
    let today = this.Localday(),
    month = new Date().getMonth() + 1,
    year = new Date().getFullYear();
    return(month + '/' + today + '/' + year);
  }
  Week() {
    var date = new Date();
    // var days = ['Sunday','Monday','Tuesday','Wednesday', 'Thursday','Friday','Saturday'],
    var prefixes = ['1', '2', '3', '4', '5'];   
    return prefixes[Math.floor(date.getDate() / 7)];
  }
  Month() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
    let month = new Date().getMonth();
    return(monthNames[month]);
  }
  handleChange = (e) => {
    this.setState({
      id: parseInt(Math.floor(Math.random() * 10000) + 1, 16),
      datecomplete: this.Today(),
      Localday: this.Localday(),
      month: this.Month(),
      week: this.Week(),
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTicket(this.state);
    this.setState({
      start: '',
      end: '',
      theme: '',
      ticketnumber: '',
      website: '',
      remarks: '',
      status: '',
      skill: ''
    })
  }
  
  render(){
    return (
      <div className="container">
        {/* <h1 className="text-center">Add Ticket</h1> */}
        <form onSubmit={this.handleSubmit}>
          <div className="row text-center">
            <div className="form-group col-sm-4">
              <label htmlFor="datecomplete">Date Completed</label>
              <input type="text" id="datecomplete" className="form-control text-center" disabled value={this.Today()}/>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="month">Month</label>
              <input type="text" id="month" className="form-control text-center" disabled value={this.Month()}/>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="week">Week</label>
              <input type="text" id="week" className="form-control text-center" disabled value={this.Week()}/>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-sm-4">
              <button type="button" className="btn btn-success" onClick={this.startTime}>Start Time</button>
              <input type="text" className="form-control mt-2 text-center" value={this.state.start} disabled onChange={this.handleChange}/>
            </div>
            <div className="col-sm-4">
              <button type="button" className="btn btn-danger" disabled={!this.state.start} onClick={this.endTime}>End Time</button>
              <input type="text" className="form-control mt-2 text-center" value={this.state.end} disabled onChange={this.handleChange}/>
            </div>
            <div className="col-sm-4">
            <button type="button" className="btn btn-primary" disabled>Duration</button>
              <p>{this.state.duration}</p>
            </div>
          </div>
          <div className="row text-center">
            <div className="form-group col-sm-3">
              <label htmlFor="theme">Theme</label>
              <input type="text" id="theme" className="form-control text-center" onChange={this.handleChange} value={this.state.theme}/>
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="ticketnumber">Ticket Number</label>
              <input type="text" id="ticketnumber" className="form-control text-center" onChange={this.handleChange} required value={this.state.ticketnumber}/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" className="form-control text-center" onChange={this.handleChange} required value={this.state.website}/>
            </div>
          </div>
          <div className="row text-center">
            <div className="form-group col-sm-3">
              <label htmlFor="status">Status</label>
              <select id="status" className="form-control text-center" onChange={this.handleChange} required value={this.state.status}>
                {/* <option disabled selected value> -- select an option -- </option> */}
                <option label=" "></option>
                <option value="Complete">Complete</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="skill">Skill</label>
              <select id="skill" className="form-control text-center" onChange={this.handleChange} required value={this.state.skill}>
                {/* <option disabled selected value> -- select an option -- </option> */}
                <option label=" "></option>
                <option value="Regular Ticket">Regular Ticket</option>
                <option value="Migration">Migration</option>
              </select>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="remarks">Remarks</label>
              <input type="text" id="remarks" className="form-control text-center" onChange={this.handleChange} value={this.state.remarks}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-right">
              <button type="submit" className="btn btn-lg btn-success">Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    addTicket: (ticket) => { dispatch(addTicket(ticket)) }
  }
}
export default connect(null, mapDispatchToProps)(AddTicket)