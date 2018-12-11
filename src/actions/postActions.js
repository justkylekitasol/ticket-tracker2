export const deleteTicket = (id) => {
  return {
    type: 'DELETE_TICKET',
    id
  }
}
export const addTicket = (ticket) => {
  return {
    type: 'ADD_TICKET',
    ticket
  }
}
