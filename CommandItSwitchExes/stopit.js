//https://www.npmjs.com/package/@svrooij/sonos

const { SonosDevice, SonosManager } = require('@svrooij/sonos')

// customize  - start
const KIDS_PLAYER_NAME = 'Dreyfus'
const KIDS_PLAYER_HOSTNAME = '' 
// customize - end

asyncWrapperStopIt()
	.then( (success) => {
	   console.log(`message > ${JSON.stringify(success)}`)
	})
	.catch((error) => {
		console.log(`error >>${JSON.stringify(error, Object.getOwnPropertyNames(error))}`)
	})
  
async function asyncWrapperStopIt() {
	
	// use given hostname or find it by name 
	let kidsPlayer
	if (KIDS_PLAYER_HOSTNAME === '') {
		// discovery
		const manager = new SonosManager()
		await manager.InitializeWithDiscovery()
		let kidsPlayerIndex = -1
		//console.log('searching for ' + KIDS_PLAYER_NAME);
		kidsPlayerIndex = manager.Devices.findIndex((player) => player.name === KIDS_PLAYER_NAME)
		if (kidsPlayerIndex < 0) {
			throw new Error(`Could not find your player ${KIDS_PLAYER_NAME}`)
		} else { 
			kidsPlayer = new SonosDevice(manager.Devices[kidsPlayerIndex].host)
		}
	} else {
		// thats faster
		kidsPlayer = new SonosDevice(KIDS_PLAYER_HOSTNAME)
	}
	console.log(`hostname for ${KIDS_PLAYER_NAME} >>${kidsPlayer.host}`)
	
	await kidsPlayer.Stop()
	console.log('playing stopped')
 
	return 'successfully finished stopit'
}
