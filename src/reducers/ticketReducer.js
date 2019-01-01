const initState = {
  USday: USday(),
  tickets: [
    { id: 1, 
      datecomplete: '12/12/2018', 
      Localday: 2, 
      month: Month(), 
      week: Week(), 
      start: '01:30 AM',
      end: '02:30 AM', 
      theme: 'Julia', 
      ticketnumber: '370156', 
      website: 'https://my.onlinechiro.com/0031729/site/editor/cms', 
      remarks: 'Edit Page', 
      status: 'Returned', 
      skill: 'Migration'
    }
  ],
  
}
function USday() {
  // let today = new Date().getUTCDate()
  // console.log(today)
  // return(today);
  var today = new Date();  
  var localoffset = -(today.getTimezoneOffset()/60);
  var destoffset = -5;
  var offset = destoffset-localoffset;
  var d = new Date( new Date().getTime() + offset * 3600 * 1000)
  var r = d.getDate()
  console.log(r)
  return(r)
}
function Week() {
  var date = new Date();
  // var days = ['Sunday','Monday','Tuesday','Wednesday', 'Thursday','Friday','Saturday'],
  var prefixes = ['1', '2', '3', '4', '5'];
  return prefixes[Math.floor(date.getDate() / 7)];
}

function Month() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
  let month = new Date().getMonth();
  return(monthNames[month]);
}

const ticketReducer = (state = initState, action) => {
  switch(action.type) {
    case 'TICKET_ERROR':
      console.log('Error', action.err);
      return state;
      
    case 'DELETE_TICKET':
      let newTicket = state.tickets.filter(ticket => {
        return action.id !== ticket.id
      });
      return {
        ...state,
        tickets: newTicket
      }
      
    case 'ADD_TICKET':
      console.log(state)
      let ticket = action.ticket;
      let tickets = [...state.tickets, ticket];
      return {
        ...state,
        tickets
      }

    case 'EDIT_TICKET':
      state.tickets.map(ticket => {
        if (ticket.id === action.ticket.id) {
          return (
            ticket.datecomplete = action.ticket.datecomplete,
            ticket.month = action.ticket.month, 
            ticket.week = action.ticket.week, 
            ticket.start = action.ticket.start,
            ticket.end = action.ticket.end, 
            ticket.theme = action.ticket.theme, 
            ticket.ticketnumber = action.ticket.ticketnumber, 
            ticket.website = action.ticket.website, 
            ticket.remarks = action.ticket.remarks, 
            ticket.status = action.ticket.status, 
            ticket.skill = action.ticket.skill
          )
        }
        else {
          return state.tickets
        }
      })
      return state
      default: return state
  }
}

export default ticketReducer