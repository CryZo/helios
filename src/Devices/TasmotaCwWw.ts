import { Color, Device, MQTTHandler } from "../";
import { IBrightness, IColorTemperature } from "../interfaces/Traits";
import { DeviceType, Trait } from "../Enums";

export default class TasmotaCwWw  extends Device implements IColorTemperature, IBrightness {
	Name: string;
	_id: string;
	Type: DeviceType = DeviceType.Lights;
	Traits: Trait[] = [Trait.OnOff, Trait.Brightness, Trait.ColorTemperature]

	Status: boolean = false;

	mh: MQTTHandler;
	tasmotaDevId: string;
	ColorTemperature: number;
	MinColorTemperature: number = 153;
	MaxColorTemperature: number = 500;
	Brightness: number = 0;

	lightenAmount: number = 20;

	constructor(Name: string, id: string, mh: MQTTHandler) {
		super();

		this.Name = Name;
		this._id = id;
		this.mh = mh;
	}
	Run(): void {
		this.mh.Subscribe(`stat/${this.tasmotaDevId}/RESULT`, this.onMQTT.bind(this));
		this.mh.Subscribe(`stat/${this.tasmotaDevId}/STATE`, this.onMQTT.bind(this));
	}

	onMQTT(payload: string): void {
		const data: any = JSON.parse(payload.toString());
		if (!data)
			return;

		if (data.Dimmer) {
			if (data.Dimmer !== this.Brightness) {
				this.Brightness = data.Dimmer;
				this.onChange();
			}
		}

		if (data.CT) {
			if (data.CT !== this.ColorTemperature) {
				this.ColorTemperature = data.CT;
				this.onChange();
			}
		}

		let tmpStatus = false;
		if (data.POWER == 'ON') {
			tmpStatus = true;
		}

		if (tmpStatus !== this.Status) {
			this.Status = tmpStatus;
			this.onChange();
		}
	}

	TurnOn(): void {
		this.Status = true;
		this.mh.SendCommand(`cmnd/${this.tasmotaDevId}/POWER`, 'ON');
		this.onChange();
	}
	TurnOff(): void {
		this.Status = false;
		this.mh.SendCommand(`cmnd/${this.tasmotaDevId}/POWER`, 'OFF');
		this.onChange();
	}
	Toggle(): void {
		this.Status = !this.Status;
		this.mh.SendCommand(`cmnd/${this.tasmotaDevId}/POWER`, 'TOGGLE');
		this.onChange();
	}

	SetBrightness(value: number): void {
		this.Brightness = value;
		this.mh.SendCommand(`cmnd/${this.tasmotaDevId}/Dimmer`, value.toString());
		this.onChange();
	}
	Lighten(amount: number = this.lightenAmount): void {
		this.Brightness += amount;
		if (this.Brightness > 100)
			this.Brightness = 100;

		this.SetBrightness(this.Brightness);
	}
	Darken(amount: number = this.lightenAmount): void {
		this.Brightness -= amount;
		if (this.Brightness < 0)
			this.Brightness = 0;

		this.SetBrightness(this.Brightness);
	}

	SetColorTemperature(value: number): void {
		this.ColorTemperature = value;
		this.mh.SendCommand(`cmnd/${this.tasmotaDevId}/CT`, value.toString());
		this.onChange();
	}

	private onChange() {
		// @ts-ignore
		// TODO
		global.eventHandler.fire('change', this);
	}
}
