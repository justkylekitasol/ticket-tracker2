export const addTicket = (ticket) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('tickets').add({
      ...ticket
    }).then(() => {
      dispatch({type: 'ADD_TICKET', ticket});
    }).catch((err) => {
      dispatch({ type: 'TICKET_ERROR', err })
    })
  }
}

export const deleteTicket = (id, skill) => {
  // return {
  //   type: 'DELETE_TICKET',
  //   id,
  //   skill
  // }
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('tickets').doc(id).delete().then(() => {
      dispatch({type: 'DELETE_TICKET', id, skill});
    }).catch((err) => {
      dispatch({ type: 'TICKET_ERROR', err })
    })
  }
}

export const editTicket = (id, ticket) => {
  // return (dispatch, getState) => {
  //   dispatch({ type: 'EDIT_TICKET', ticket });
  // }
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('tickets').doc(id).update({
      datecomplete: ticket.datecomplete,
      month: ticket.month,
      week: ticket.week,
      start: ticket.start,
      end: ticket.end,
      theme: ticket.theme,
      ticketnumber: ticket.ticketnumber,
      website: ticket.website,
      remarks: ticket.remarks,
      status: ticket.status, 
      skill: ticket.skill,
    }).then(() => {
      dispatch({type: 'EDIT_TICKET', ticket});
    }).catch((err) => {
      dispatch({ type: 'TICKET_ERROR', err })
    })
  }
}