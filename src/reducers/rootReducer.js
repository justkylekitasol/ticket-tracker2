const initState = {
  USday: USday(),
  regulartickets: 0,
  migrations: 0,
  tickets: [
    { id: 1, 
      datecomplete: '12/12/2018', 
      Localday: 1, 
      month: Month(), 
      week: Week(), 
      start: '01:30 AM',
      end: '02:30 AM', 
      theme: 'Julia', 
      ticketnumber: '370156', 
      website: 'https://my.onlinechiro.com/0031729/site/editor/cms', 
      remarks: 'Edit Page', 
      status: 'Complete', 
      skill: 'Regular Ticket' },
    { id: 2, 
      datecomplete: '12/3/2018', 
      Localday: 3, 
      month: Month(), 
      week: Week(), 
      start: '01:30 AM',
      end: '02:30 AM', 
      theme: 'Julia', 
      ticketnumber: '370156', 
      website: 'https://my.onlinechiro.com/0031729/site/editor/cms', 
      remarks: 'Edit Page', 
      status: 'Complete', 
      skill: 'Migration' }
  ],
  
}
function USday() {
  let today = new Date().getUTCDate()
  return(today);
}
function Week() {
  // const weekNumber = new Date().getDate();
  // const weekNumberofMonth = ['first', 'second', 'third', 'fourth', 'fifth'];
  // console.log(weekNumber);
  // console.log(weekNumberofMonth[Math.floor(31 / 7)]);
  // const today = new Date();
  // const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  // const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  // console.log(today, firstDayOfYear, pastDaysOfYear);
  // return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  var date = new Date();
  var days = ['Sunday','Monday','Tuesday','Wednesday', 'Thursday','Friday','Saturday'],
  prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
  return prefixes[Math.floor(date.getDate() / 7)] + ' ' + days[date.getDay()];
}

function Month() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
  let month = new Date().getMonth();
  return(monthNames[month]);
}
const rootReducer = (state = initState, action) => {
  if (action.type === 'DELETE_TICKET') {
    let newTicket = state.tickets.filter(ticket => {
      return action.id !== ticket.id
    });
    return {
      ...state,
      tickets: newTicket
    }
  }
  if (action.type === 'ADD_TICKET') {
    action.id = Math.random();
    let ticket = action.ticket;
    let tickets = [...state.tickets, ticket];
    console.log(action);
    return {
      ...state,
      tickets
    }
  }
  return state;
}

export default rootReducer