import authReducer from './authReducer';
import ticketReducer from './ticketReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
const rootReducer = combineReducers({
  auth: authReducer,
  ticket: ticketReducer,
  firestore: firestoreReducer
})

export default rootReducer