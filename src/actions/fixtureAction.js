import { MQTT_MESSAGE , MQTT_SUBSCRIBED ,MQTT_FAIL, MQTT_RECONNECT } from './type'
import mqtt from 'mqtt'

export const subscribeMqtt = (clientUrl) => async dispatch => {
    const client  = mqtt.connect(clientUrl)
    client.on('connect', function () {
        client.subscribe('fixture_status', function (err) {
            if(err){

            }
            dispatch({
                type: MQTT_SUBSCRIBED,
                payload: clientUrl

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
        const byteArray= []
    // message is Buffer
        var jsonStr = JSON.parse(message.toString());
        const buf=Buffer.from(jsonStr.data);
        var fixtureid = buf.toString('hex', 3, 11)
        var fixtureByte = buf.readUInt8(11)
        var fixtureBattery = buf.readUInt8(12)
        var fixtureBrightness = buf.readUInt8(21)

        if(byteArray.length> 0) {
            
            // eslint-disable-next-line array-callback-return
            var local = byteArray.find(function(element) {
                
                if (element.id === fixtureid  ){
                    console.log(element.id,fixtureid)
                    if(element.battery!== fixtureBattery || element.brightness !== fixtureBrightness || element.byte!== fixtureByte) {
                        console.log("Found")
                        element.battery = fixtureBattery
                        element.brightness = fixtureBrightness
                        element.byte = fixtureByte
                    
                        // setMessage(byteArray.current)
                    }
                    
                    return true
                } 
                
            })
            if(!local){
                byteArray.push({id :fixtureid,byte :fixtureByte ,brightness:fixtureBrightness,battery:fixtureBattery})
              
            }
            
        
        }
        else {
            console.log("push")
            byteArray.push({id :fixtureid,byte :fixtureByte ,brightness:fixtureBrightness,battery:fixtureBattery})
         
        }
       
    })
}
