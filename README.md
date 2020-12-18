# homebridge-commanditswitch Plugin
# Alex Maghen
# Based on "homebridge-dummy" Switch Plugin

Example config.json:

```
    "accessories": [
        {
          "accessory": "CommandItSwitch",
          "name": "DoIt"
          "exe": "ExecMe"
        }   
    ]

```

With this plugin, you can create any number of fake switches that, when "turned on," will run the executable set in the "exe" field of the accessory that is created in Homebrige, in a specific CommandIt directory on the machine hosting Homebridge.

The fake switches that are created are effectively "momentary" in that 1 second after they are turned on, they turn themselves off. That's because turning the switch on is effectively the same as executing something which finishes on its own.



```
