import { combineReducers } from 'redux'
import fixtureReducer from './fictureReducer'
import chartReducer from './chartReducer'

export default combineReducers({
    fixture: fixtureReducer,
    chart : chartReducer
})