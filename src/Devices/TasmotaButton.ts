import { Device, MQTTHandler } from "..";
import { DeviceType, Trait } from "../Enums";

export default class TasmotaButton extends Device {
	Name: string;
	_id: string;
	Type: DeviceType = DeviceType.Sensors;
	Traits: Trait[] = []
	
	mh: MQTTHandler;
	tasmotaDevId: string;

	constructor(Name: string, id: string, mh: MQTTHandler) {
		super();
		
		this.Name = Name;
		this._id = id;
		this.mh = mh;
	}
	
	Run(): void {
		this.mh.Subscribe(`stat/${this.tasmotaDevId}/RESULT`, this.onMQTT.bind(this));
	}

	onMQTT(payload: string): void {
		let data: any = JSON.parse(payload.toString());

		Object.keys(data).forEach(key => {
			if (key.toUpperCase().includes('BUTTON')) {
				this.emit('input', {
					inputNumber: parseInt(key.match(/([0-9]+)/)[0]),
					inputStatus: data[key]
				});
			}
		});
	}
}