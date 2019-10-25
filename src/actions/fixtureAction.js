import { MQTT_FIXTURE , MQTT_SUBSCRIBED ,MQTT_FAIL, MQTT_RECONNECT ,ADD_FIXTURE} from './type'
import mqtt from 'mqtt'
import store from '../store'



export const subscribeMqtt = (clientUrl) => async dispatch => {
    
    const client  = mqtt.connect(clientUrl)
    client.on('connect', function () {
        client.subscribe('fixture_status', function (err) {
            if(err){
            }
            dispatch({
                type: MQTT_SUBSCRIBED,
                payload: clientUrl,

            })
            
        })
    })
    client.stream.on('error', function(err) {
        dispatch({
            type: MQTT_FAIL,
            payload: null
            
        })
    })
    client.on('reconnect' , function() {
        dispatch({
            type: MQTT_RECONNECT,
            payload: null
        })
    })
    client.on('message', function (topic, message) {

        console.log(store.getState().fixture.msg)
        var Mqtt = store.getState().fixture.msg
      
       
    // message is Buffer
        var jsonStr = JSON.parse(message.toString());
        const buf=Buffer.from(jsonStr.data);
        var fixtureid = buf.toString('hex', 3, 11)
        var fixtureByte = buf.readUInt8(11)
        var fixtureBattery = buf.readUInt8(12)
        var fixtureBrightness = buf.readUInt8(21)
        dispatch({
            type: MQTT_FIXTURE,
            payload: jsonStr.data
        })
        if(Mqtt.length> 0) {
            
            // eslint-disable-next-line array-callback-return
            var local = Mqtt.find(function(element) {
                
                if (element.id === fixtureid  ){
                    console.log(element.id,fixtureid)
                    if(element.battery!== fixtureBattery || element.brightness !== fixtureBrightness || element.byte!== fixtureByte) {
                        console.log("Found")
                        element.battery = fixtureBattery
                        element.brightness = fixtureBrightness
                        element.byte = fixtureByte
                        element.lastReceieved = 0
                    
                        // setMessage(byteArray.current)
                    }
                    
                    return true
                } 
                
            })
            if(!local){
                dispatch({
                    type: ADD_FIXTURE,
                    payload: {id :fixtureid,byte :fixtureByte ,brightness:fixtureBrightness,battery:fixtureBattery,lastReceieved: 0}
                })
              
            }
            
        
        }
        else {
            dispatch({
                type: ADD_FIXTURE,
                payload: {id :fixtureid,byte :fixtureByte ,brightness:fixtureBrightness,battery:fixtureBattery,lastReceieved: 0}
            })
            
            // byteArray.push({id :fixtureid,byte :fixtureByte ,brightness:fixtureBrightness,battery:fixtureBattery,lastReceieved: 0})
         
        }
        
       
    })
}
