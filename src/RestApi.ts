import express from "express";
import history from 'connect-history-api-fallback';
import path from 'path';
import { Device, DeviceController, Room, RoomCollection } from "./";
import { DeviceType, Trait } from "./Enums";
import { IDeviceStructure } from "./interfaces/Rest";
import { IOnOff, IRGB, IOpenClose, IPosition, IBrightness, ITemperatureSetting, ITemperature, IHumidity, IPower, IEnergy } from "./interfaces/Traits";

//TODO Refactor me!
//Note: This file also serves static content.

export default class RestApi {
	model: RoomCollection;
	app: express.Express;
	server: any;
	

	constructor(model: RoomCollection) {
		this.model = model;

		this.Run();
	}

	async Run() {
		this.app = express();
		this.app.use(history())
		this.app.use(function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});

		this.app.use(express.static(path.join(__dirname, 'public')));

		this.app.get('/full', (req: any, res: any) => {
			res.end(this.model.stringify());
		});

		this.app.get('/controll/:dev/:status', this.HandleControl.bind(this));
		this.app.get('/control/:dev/:status', this.HandleControl.bind(this));
		this.app.get('/control/room/:id/:devType/:status', this.HandleRoomControl.bind(this));

		this.server = this.app.listen(8081, () => {
			let host = this.server.address().address,
				port = this.server.address().port;

			console.log(`Example app listening at http://${host}:${port}`);
		})
	}

	HandleControl(req: any, res: any) {
		try {
			let dev = this.model.GetDevices().GetById(req.params.dev)

			//Apply extra params
			{
				let params: string[] = Object.keys(req.query);
				for (let i in params) {
					let curParam = params[i];
					if (dev && (<any>dev)[curParam] != null)
						(<any>dev)[curParam] = req.query[curParam];
				}
			}

			DeviceController.HandleCommand(dev, req.params.status);
		}
		catch (error) {
			res.status(400).end(error);
		}
		res.status(200).end();
	}

	HandleRoomControl(req: any, res: any) {
		try {
			let room: Room = this.model.GetById(req.params.id);

			room.handleCommand(DeviceType[req.params.devType as keyof typeof DeviceType], req.params.status);
		}
		catch (error) {
			res.status(400).end(error);
		}
		res.status(200).end();
	}

	static generateDeviceStructure(data: Device[]): IDeviceStructure[] {//TODO Refactor me and then move me to DeviceCollection.ts
		let ret: IDeviceStructure[] = [];

		for (let d in data) {
			let curDev = data[d];
			let dev: IDeviceStructure = {
				id: curDev._id,
				Name: curDev.Name,
				Type: curDev.Type,
				Traits: curDev.Traits
			};

			if (curDev.Traits.includes(Trait.OnOff))
			{
				let castedDev = curDev as IOnOff;
				dev.Status = castedDev.Status;
			}

			if (curDev.Traits.includes(Trait.RGB))
			{
				let castedDev = curDev as IRGB;
				dev.Color = castedDev.GetColor().GetHexColor();
			}
			
			if (curDev.Traits.includes(Trait.Brightness))
			{
				let castedDev = curDev as IBrightness;
				dev.Brightness = castedDev.Brightness;
			}

			if (curDev.Traits.includes(Trait.OpenClose))
			{
				let castedDev = curDev as IOpenClose;
				dev.MovementStatus = castedDev.MovementStatus;
			}

			if (curDev.Traits.includes(Trait.Position))
			{
				let castedDev = curDev as IPosition;
				dev.Position = castedDev.Position;
			}

			if (curDev.Traits.includes(Trait.TemperatureSetting))
			{
				let castedDev = curDev as ITemperatureSetting;
				dev.TargetTemperature = castedDev.TargetTemperature;
			}

			if (curDev.Traits.includes(Trait.Temperature))
			{
				let castedDev = curDev as ITemperature;
				dev.Temperature = castedDev.Temperature;
			}

			if (curDev.Traits.includes(Trait.Humidity))
			{
				let castedDev = curDev as IHumidity;
				dev.Humidity = castedDev.Humidity;
			}

			if (curDev.Traits.includes(Trait.Power))
			{
				let castedDev = curDev as IPower;
				dev.Power = castedDev.Power;
			}

			if (curDev.Traits.includes(Trait.Energy))
			{
				let castedDev = curDev as IEnergy;
				dev.Energy = castedDev.Energy;
			}

			ret.push(dev);
		}

		return ret;
	}
}