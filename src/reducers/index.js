import { combineReducers } from 'redux'
import fixtureReducer from './fictureReducer'

export default combineReducers({
    fixture: fixtureReducer
})