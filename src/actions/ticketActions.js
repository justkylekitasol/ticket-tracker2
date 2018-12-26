export const addTicket = (ticket) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('tickets').add({
      ...ticket
    }).then(() => {
      dispatch({type: 'ADD_TICKET', ticket});
    }).catch((err) => {
      dispatch({ type: 'ADD_TICKET_ERROR', err })
    })
    
  }
}

export const deleteTicket = (id, skill) => {
  return {
    type: 'DELETE_TICKET',
    id,
    skill
  }
}

export const editTicket = (ticket) => {
  return (dispatch, getState) => {
    dispatch({ type: 'EDIT_TICKET', ticket });
  }
}