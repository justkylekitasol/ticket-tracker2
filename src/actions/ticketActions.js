export const deleteTicket = (id, skill) => {
  return {
    type: 'DELETE_TICKET',
    id,
    skill
  }
}
export const addTicket = (ticket) => {
  return {
    type: 'ADD_TICKET',
    ticket
  }
}
export const editTicket = (ticket) => {
  return {
    type: 'EDIT_TICKET',
    ticket
  }
}