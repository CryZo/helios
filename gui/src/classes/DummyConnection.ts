import { DeviceType, Trait } from "connector/Enums";
import { IBackendConnection } from "connector/connection";
import { IRoomStructure } from 'connector/interfaces/Rest';

export default class DummyConnection implements IBackendConnection {
  // TODO fuck enums. Use string literals instead.

  public data: IRoomStructure[] = [
    {
      "id": "sz",
      "Name": "Schlafzimmer",
      "Floor": 1,
      "Devices": [
        {
          "id": "sz-dl",
          "Name": "Deckenlampe",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff
          ],
          "Status": false
        },
        {
          "id": "sz_kleiderschrank",
          "Name": "Schrank",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff,
            Trait.RGB,
            Trait.Brightness
          ],
          "Status": false,
          "Color": "000000",
          "Brightness": 1
        },
        {
          "id": "sz_rollo",
          "Name": "Rolladen",
          "Type": DeviceType.Blinds,
          "Traits": [
            Trait.OpenClose,
            Trait.Position,
            Trait.Temperature,
            Trait.Power,
            Trait.Energy
          ],
          "MovementStatus": undefined,
          "Position": 20,
          "Temperature": 40,
          "Power": 0,
          "Energy": 954.3833333333333
        }
      ],
      "Traits": {
        //@ts-ignore
        "Lights": [
          "OnOff",
          "RGB",
          "Brightness"
        ],
        "Blinds": [
          "OpenClose",
          "Position",
          "Temperature",
          "Power",
          "Energy"
        ]
      }
    },
    {
      "id": "bad",
      "Name": "Bad",
      "Floor": 1,
      "Devices": [
        {
          "id": "bad_heater",
          "Name": "Heizung",
          "Type": DeviceType.Heater,
          "Traits": [
            Trait.OnOff,
            Trait.TemperatureSetting,
            Trait.Temperature,
            Trait.Humidity
          ],
          "Status": true,
          "TargetTemperature": 18,
          "Temperature": 0,
          "Humidity": 0
        },
        {
          "id": "bad_win1",
          "Name": "Fenstersensor (links)",
          "Type": DeviceType.Blinds,
          "Traits": [
            Trait.OpenCloseStatus,
            Trait.Temperature,
            Trait.Lux,
            Trait.Illumination,
            Trait.Battery,
            Trait.Vibration
          ],
          "Temperature": 0
        }
      ],
      "Traits": {
        //@ts-ignore
        "Heater": [
          "OnOff",
          "TemperatureSetting",
          "Temperature",
          "Humidity"
        ],
        "Blinds": [
          "OpenCloseStatus",
          "Temperature",
          "Lux",
          "Illumination",
          "Battery",
          "Vibration"
        ]
      },
      "Temperature": 0,
      "Humidity": 0
    },
    {
      "id": "fl1",
      "Name": "Flur (oben)",
      "Floor": 1,
      "Devices": [
        {
          "id": "fl1-dl",
          "Name": "Deckenlampe",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff
          ],
          "Status": false
        }
      ],
      "Traits": {
        //@ts-ignore
        "Lights": [
          "OnOff"
        ]
      }
    },
    {
      "id": "wz",
      "Name": "Wohnzimmer",
      "Floor": 0,
      "Devices": [
        {
          "id": "pyramide",
          "Name": "Pyramiden Lampe",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff,
            Trait.RGB
          ],
          "Status": false,
          "Color": "000000"
        },
        {
          "id": "wz_df",
          "Name": "Deckenfluter",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff,
            Trait.Brightness
          ],
          "Status": false,
          "Brightness": 100
        },
        {
          "id": "wz_ll",
          "Name": "Leselampe",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff,
            Trait.Brightness
          ],
          "Status": false,
          "Brightness": 100
        },
        {
          "id": "wz_dl",
          "Name": "Deckenlampe",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff
          ],
          "Status": false
        },
        {
          "id": "wz_rollo_l",
          "Name": "Rolladen (links)",
          "Type": DeviceType.Blinds,
          "Traits": [
            Trait.OpenClose,
            Trait.Position,
            Trait.Temperature,
            Trait.Power,
            Trait.Energy
          ],
          "MovementStatus": undefined,
          "Position": 0,
          "Temperature": 0,
          "Power": 0,
          "Energy": 0
        },
        {
          "id": "wz_rollo_r",
          "Name": "Rolladen (rechts)",
          "Type": DeviceType.Blinds,
          "Traits": [
            Trait.OpenClose,
            Trait.Position,
            Trait.Temperature,
            Trait.Power,
            Trait.Energy
          ],
          "MovementStatus": undefined,
          "Position": 0,
          "Temperature": 47,
          "Power": 0,
          "Energy": 4318.65
        },
        {
          "id": "wz_amp",
          "Name": "Verstärker",
          "Type": DeviceType.Multimedia,
          "Traits": [
            Trait.OnOff
          ],
          "Status": false
        },
        {
          "id": "wz_sofa",
          "Name": "Schalter (Sofa)",
          "Type": DeviceType.Sensors,
          "Traits": []
        },
        {
          "id": "wz_weihnachtsbaum",
          "Name": "Weihnachtsbaum",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff
          ],
          "Status": false
        },
        {
          "id": "wz_firetree",
          "Name": "Feuerbaum",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff,
            Trait.Brightness
          ],
          "Status": false,
          "Brightness": 20
        }
      ],
      "Traits": {
        //@ts-ignore
        "Lights": [
          "OnOff",
          "RGB",
          "Brightness"
        ],
        "Blinds": [
          "OpenClose",
          "Position",
          "Temperature",
          "Power",
          "Energy"
        ],
        "Multimedia": [
          "OnOff"
        ],
        "Sensors": []
      }
    },
    {
      "id": "ez",
      "Name": "Esszimmer",
      "Floor": 0,
      "Devices": [
        {
          "id": "wz_schrank",
          "Name": "Schrank",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff,
            Trait.RGB,
            Trait.Brightness
          ],
          "Status": false,
          "Color": "000000",
          "Brightness": 6
        },
        {
          "id": "ez_dl",
          "Name": "Deckenlampe",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff
          ],
          "Status": false
        }
      ],
      "Traits": {
        // @ts-ignore
        "Lights": [
          "OnOff",
          "RGB",
          "Brightness"
        ]
      }
    },
    {
      "id": "kitchen",
      "Name": "Küche",
      "Floor": 0,
      "Devices": [
        {
          "id": "k_strip1",
          "Name": "LED Streifen links",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff,
            Trait.Brightness
          ],
          "Status": false,
          "Brightness": 100
        },
        {
          "id": "k_strip2",
          "Name": "LED Streifen rechts",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff,
            Trait.Brightness
          ],
          "Status": false,
          "Brightness": 100
        },
        {
          "id": "k_dl",
          "Name": "Deckenlampe",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff
          ],
          "Status": false
        },
        {
          "id": "k_dunstabzugshaube",
          "Name": "Dunstabzugshaube",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff
          ],
          "Status": false
        }
      ],
      "Traits": {
        //@ts-ignore
        "Lights": [
          "OnOff",
          "Brightness"
        ]
      }
    },
    {
      "id": "garderobe",
      "Name": "Garderobe",
      "Floor": 0,
      "Devices": [
        {
          "id": "ez_df",
          "Name": "Deckenfluter",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff
          ],
          "Status": false
        },
        {
          "id": "garderobe_rollo",
          "Name": "Rolladen",
          "Type": DeviceType.Blinds,
          "Traits": [
            Trait.OpenClose,
            Trait.Position,
            Trait.Temperature,
            Trait.Power,
            Trait.Energy
          ],
          "MovementStatus": undefined,
          "Position": 0,
          "Temperature": 46,
          "Power": 0,
          "Energy": 2224.75
        },
        {
          "id": "garderobe-dl",
          "Name": "Deckenlampe",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff
          ],
          "Status": false
        }
      ],
      "Traits": {
        //@ts-ignore
        "Lights": [
          "OnOff"
        ],
        "Blinds": [
          "OpenClose",
          "Position",
          "Temperature",
          "Power",
          "Energy"
        ]
      }
    },
    {
      "id": "chaser",
      "Name": "Arbeitszimmer",
      "Floor": 1,
      "Devices": [
        {
          "id": "tokyo_sign",
          "Name": "Tokyo Schild",
          "Type": DeviceType.Lights,
          "Traits": [
            Trait.OnOff,
            Trait.Brightness,
            Trait.ColorTemperature
          ],
          "Status": true,
          "Brightness": 100,
          "ColorTemperature": 400,
          "MinColorTemperature": 150,
          "MaxColorTemperature": 500
        }
      ],
      "Traits": {
        //@ts-ignore
        "Lights": [
          "OnOff",
          "Brightness",
          "ColorTemperature"
        ]
      }
    }
  ];

  constructor() {
  }

  public sendDeviceCommand(device: string, command: string): void {
    console.log(`Device command for ${device}: ${command}`);
  }
  public sendRoomCommand(room: string, devType: string, command: string): void {
    console.log(`Room command for ${room} (${devType}): ${command}`);
  }
}