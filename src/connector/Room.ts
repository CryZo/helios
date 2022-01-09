import { Device } from ".";
import { DeviceType, Trait } from "./Enums";

export default class Room {
	Name: string;
	Floor: number;
	_id: string;
	Devices: Device[] = [];

	GetTraits(): {[devType: string]: Trait[]} {
		let ret: any = {};
		for (let i in this.Devices) {
			let curDev = this.Devices[i];

			if (!ret[DeviceType[curDev.Type]]) {
				ret[DeviceType[curDev.Type]] = [];
			}

			curDev.Traits.forEach(trait => {
				if (!(<Trait[]>ret[DeviceType[curDev.Type]]).includes(trait)) {
					(<Trait[]>ret[DeviceType[curDev.Type]]).push(trait)
				}
			});
		}

		return ret;
	}

	getAverageTemperature(): number {
		let temps: number[] = [];

		for (let i in this.Devices) {
			let curDev = this.Devices[i];

			if (curDev.Traits.includes(Trait.Temperature)) {
				if (curDev.IsRoomTemperature)
					temps.push(curDev.Temperature);
			}
		}

		if (temps.length > 0) {
			//if (temps.length == 1) {
				return temps[0];
			//}
			//TODO Implement this, if you have more than one sensor in a room
		}
	}

	getAverageHumidity(): number {
		let temps: number[] = [];

		for (let i in this.Devices) {
			let curDev = this.Devices[i];

			if (curDev.Traits.includes(Trait.Humidity)) {
				temps.push(curDev.Humidity);
			}
		}

		if (temps.length > 0) {
			//if (temps.length == 1) {
				return temps[0];
			//}
			//TODO Implement this, if you have more than one sensor in a room
		}
	}
}
