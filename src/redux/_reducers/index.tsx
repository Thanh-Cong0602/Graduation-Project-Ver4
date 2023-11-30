import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './user.reducer'
import { appReducer } from './app.reducer'
import { thesisReducer } from './thesis.reducer'
const rootReducer = combineReducers({
  userReducer,
  appReducer,
  thesisReducer
})

export default rootReducer
