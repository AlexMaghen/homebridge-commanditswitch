"use strict";

var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;
  homebridge.registerAccessory("homebridge-commanditswitch", "CommandItSwitch", CommandItSwitch);
}

function CommandItSwitch(log, config) {
  this.log = log;
  this.name = config.name;
  this.exe = config.exe ? config.exe : "noop";		
  this._service = new Service.Switch(this.name);
  
  this.cacheDirectory = HomebridgeAPI.user.persistPath();
  this.storage = require('node-persist');
  this.storage.initSync({dir:this.cacheDirectory, forgiveParseErrors: true});
  
  this._service.getCharacteristic(Characteristic.On)
    .on('set', this._setOn.bind(this));

  if (this.reverse) this._service.setCharacteristic(Characteristic.On, true);

  if (this.stateful) {
	var cachedState = this.storage.getItemSync(this.name);
	if((cachedState === undefined) || (cachedState === false)) {
		this._service.setCharacteristic(Characteristic.On, false);
	} else {
		this._service.setCharacteristic(Characteristic.On, true);
	}
  }
}

CommandItSwitch.prototype.getServices = function() {
  return [this._service];
}

CommandItSwitch.prototype._setOn = function(on, callback) {

  this.log("Setting switch to " + on);
  
  if (on)
  {
  	this.log("Executing ('exe'): " + this.exe);
    setTimeout(function()
    {
      this._service.setCharacteristic(Characteristic.On, false);
    }.bind(this), 1000);
  } 
  
  callback();
}
