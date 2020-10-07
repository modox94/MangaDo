import { combineReducers } from 'redux'
import translateReducer from './translateReducer/translateReducer'

const rootReducer = combineReducers({
  translateMark: translateReducer,
 
})

export default rootReducer
