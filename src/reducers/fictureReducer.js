import { MQTT_MESSAGE , MQTT_SUBSCRIBED ,MQTT_FAIL ,MQTT_RECONNECT } from '../actions/type'

const initialState = {
    isSubscribed : false,
    url: null,
    status: null,
    msg:[]
   
}

export default function( state = initialState,action ) {
    const { payload,type } = action
    switch(type) {
        case MQTT_SUBSCRIBED: 
            return {
                
                isSubscribed : true,
                status:'subscribed',
                url:payload
            }
        case MQTT_FAIL: 
            return {
               
                isSubscribed : false,
                status:'failed',
                url:payload
            }
        case MQTT_RECONNECT :
            return {
                isSubscribed: false,
                url: null,
                status: 'reconnecting'
            }
        case MQTT_MESSAGE : 
            return {
                msg:payload
            }
        default:
            return state
    }
}