import {  MQTT_SUBSCRIBED ,MQTT_FAIL ,MQTT_RECONNECT ,ADD_FIXTURE, ADD_API_FIXTURE, TIMER } from '../actions/type'
import moment from 'moment'

const initialState = {
    isSubscribed : false,
    url: null,
    status: null,
    msg:[],

}

export default function( state = initialState,action ) {
    const { payload,type } = action
    switch(type) {
        case MQTT_SUBSCRIBED: 
            return {
                ...state,
                isSubscribed : true,
                status:'subscribed',
                url:payload,
                
            }
        case MQTT_FAIL: 
            return {
                ...state,
                isSubscribed : false,
                status:'failed',
                url:payload,
            }
        case MQTT_RECONNECT :
            return {
                ...state,
                isSubscribed: false,
                url: null,
                status: 'reconnecting'
            }
        case ADD_FIXTURE :
            
            let newArray = state.msg.slice()
            newArray.push(payload);
            return {
                ...state,
                status: 'Recieving log',
                msg: newArray
            }
        
        case ADD_API_FIXTURE:
            let apiArray = state.msg.slice()
         
            payload.map(row =>
                {
                    moment().diff(row.updatedAt,'seconds') >= 30 && moment().diff(row.updatedAt,'seconds') < 50 ? 
                        (row.last_received = 3 )
                    : 
                        moment().diff(row.updatedAt,'seconds') <30 ?
                        row.last_received = 0 : row.last_received = 5
                        
                    apiArray.push(row)
                }
            )
            return {
                ...state,
                msg : apiArray
            }
        case TIMER:
            state.msg.map(row =>
                row.last_received = row.last_received + 1
            )
            
            return {
                ...state,
            }

        default:
            return state
    }
}