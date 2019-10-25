import React,{ useEffect } from 'react'
import './App.css';
// import mqtt from 'mqtt'
import Fixture from './Fixture';

import { Provider} from 'react-redux'
import store from './store';

const App = (props) => {
	const byteArray = React.useRef([])
	// const [fixtures,setFixtures] = React.useState()




	// useEffect(() => {
		

		// client.on('message', function (topic, message) {
		// // message is Buffer
		// 	var jsonStr = JSON.parse(message.toString());
		// 	const buf=Buffer.from(jsonStr.data);
		// //get fixture info
		// 	var fixtureid = buf.toString('hex', 3, 11)
		// 	var fixtureByte = buf.readUInt8(11)
		// 	var fixtureBattery = buf.readUInt8(12)
		// 	var fixtureBrightness = buf.readUInt8(21)

		// 	if(byteArray.current.length> 0) {
				
		// 		// eslint-disable-next-line array-callback-return
		// 		var local = byteArray.current.find(function(element) {
					
		// 			if (element.id === fixtureid  ){
		// 				console.log(element.id,fixtureid)
		// 				if(element.battery!== fixtureBattery || element.brightness !== fixtureBrightness || element.byte!== fixtureByte) {
		// 					console.log("Found")
		// 					element.battery = fixtureBattery
		// 					element.brightness = fixtureBrightness
		// 					element.byte = fixtureByte
		// 					// setMessage(byteArray.current)
							
		// 				}
		// 				setFixtures(element.id)
		// 				return true
		// 			} 
					
		// 		})
		// 		if(!local){
		// 			byteArray.current.push({id :fixtureid,byte :fixtureByte ,brightness:fixtureBrightness,battery:fixtureBattery})
		// 			setFixtures(fixtureid)
		// 		}
				
			
		// 	}
		// 	else {
		// 		console.log("push")
		// 		byteArray.current.push({id :fixtureid,byte :fixtureByte ,brightness:fixtureBrightness,battery:fixtureBattery})
		// 		setFixtures(fixtureid)
		// 	}
		// 	console.log(byteArray.current)
			
		// })
	// },[byteArray,fixtures])


	return (
		<Provider store = { store}>
			<div>
				<Fixture info={byteArray.current}/>
			</div>
		</Provider>
	)
}

export default App
