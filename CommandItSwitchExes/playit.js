//https://www.npmjs.com/package/@svrooij/sonos

const { SonosDevice, SonosManager } = require('@svrooij/sonos')

// customize  - start
const KIDS_PLAYER_NAME = 'Dreyfus'
const KIDS_PLAYER_HOSTNAME = '' // leave blank if you dont know
const MY_SONOS_SONG_TITLE = 'PopApp Radio'
const VOLUME_SONG = 80
// customize - end

asynWrapperPlayIt()
	.then( (success) => {
	   console.log(`message > ${JSON.stringify(success)}`)
	})
	.catch((error) => {
		console.log(`error >>${JSON.stringify(error, Object.getOwnPropertyNames(error))}`)
	})
  
async function asynWrapperPlayIt() {
	
	// use given hostname or find it by name
	let kidsPlayer
	if (KIDS_PLAYER_HOSTNAME === '') {
		// discovery
		const manager = new SonosManager()
		await manager.InitializeWithDiscovery()
		let kidsPlayerIndex = -1
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
	
	// get favorite song
	const favorites = await kidsPlayer.GetFavorites()
	const allTitles = favorites.Result
	const myTitle = allTitles.find((item) => {
		if (typeof item.Title === 'string') {
		  return (item.Title.startsWith(MY_SONOS_SONG_TITLE))
		} else {
			return false
		}
	})
	console.log(`title details >>${JSON.stringify(myTitle)}`)

	await	kidsPlayer.SetAVTransportURI(myTitle.TrackUri)
	await kidsPlayer.SetVolume(VOLUME_SONG)
	await kidsPlayer.Play()
	console.log('playing started')
 
	return 'successfully finished playit'
}
 

