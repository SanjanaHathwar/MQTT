import {   MQTT_SUBSCRIBED ,MQTT_FAIL, MQTT_RECONNECT ,ADD_FIXTURE } from './type'
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

    
        var Mqtt = store.getState().fixture.msg
      
       
    // message is Buffer
        var jsonStr = JSON.parse(message.toString());
        const buf=Buffer.from(jsonStr.data);
        var fixtureid = buf.toString('hex', 3, 11)
        var fixtureByte = buf.readUInt8(11)
        var fixtureBattery = buf.readUInt8(12)
        var fixtureBrightness = buf.readUInt8(21)
        
        if(Mqtt.length> 0) {
            
            // eslint-disable-next-line array-callback-return
            var local = Mqtt.find(function(element) {
                
                if (element.fixtureId === fixtureid  ){
                    element.last_received = 0
                   
                    if(element.battery_level!== fixtureBattery || element.brightness_level !== fixtureBrightness || element.powermode!== fixtureByte) {
                        
                        element.battery_level = fixtureBattery
                        element.brightness_level = fixtureBrightness
                        element.powermode = fixtureByte
                      
                    }
                    return true
                } 
            })
            if(!local){
                dispatch({
                    type: ADD_FIXTURE,
                    payload: {fixtureId :fixtureid,powermode :fixtureByte ,brightness_level:fixtureBrightness,battery_level:fixtureBattery,last_received: 0}
                })
            }
        }
        else {
            dispatch({
                type: ADD_FIXTURE,
                payload: {fixtureId :fixtureid,powermode :fixtureByte ,brightness_level:fixtureBrightness,battery_level:fixtureBattery,last_received: 0}
            })
        }
    })
}


