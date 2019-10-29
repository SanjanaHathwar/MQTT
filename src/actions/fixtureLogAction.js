import { ADD_API_FIXTURE, TIMER } from './type'
import axios from 'axios'


export const fixtureLog = () => async dispatch => {
    try {
        const res = await axios.get('http://192.168.33.106:8080/api/v1/log')
        dispatch({
            type: ADD_API_FIXTURE,
            payload: res.data
        })

    } catch (error) {
      console.log(error)  
    }
}

export  const timer = () => async dispatch => {
        
    dispatch({
        type: TIMER,
     
    })
    
}