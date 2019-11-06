import { BATTERY_STATUS } from "../actions/type";

const initialState ={
    batteryStatus : 0
}

export default function( state = initialState,action ) {
    const {type,payload} = action;
    switch(type) {
        case BATTERY_STATUS : 
        let battery
        payload.map(row => 
            battery = row.batterystatus
        )
            return {
                ...state,
                batteryStatus : battery
            }
        default :
            return {
                ...state
            }
    }
}