import authReducer from './authReducer';
import ticketReducer from './ticketReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  ticket: ticketReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer