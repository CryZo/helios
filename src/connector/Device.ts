import { Color } from ".";
import { BlindStatus, DeviceType, Trait } from "./Enums";
import { IBackendConnection } from "./connection";

export default class Device {
    _id: string;
    Name: string;
    Type: DeviceType;
    Traits: Trait[] = [];

    Battery: number;
    Brightness: number;
    Energy: number;
    Humidity: number;
    Illumination: number;
    Lux: number;
    Status: boolean;
    MovementStatus: BlindStatus;
    Position: number;
    Power: number;
    Color: Color;
    Temperature: number;
    IsRoomTemperature: boolean;
    TargetTemperature: number;
    AutomationTemperature: number;
    Vibration: boolean;

    connection: IBackendConnection

    constructor(connection: IBackendConnection) {
        this.connection = connection;
    }

    Lighten(amount: number = 15): void {
		this.Brightness += amount;
		if (this.Brightness > 100)
			this.Brightness = 100;

		this.SetBrightness();
    }
    Darken(amount: number = 15): void {
		this.Brightness -= amount;
		if (this.Brightness < 0)
			this.Brightness = 0;

		this.SetBrightness();
    }
    SetBrightness(value: number = this.Brightness): void {
        this.connection.sendDeviceCommand(this._id, value.toString());
    }

    TurnOn(): void {
        this.Status = true;
        this.connection.sendDeviceCommand(this._id, 'on');
    }
    TurnOff(): void {
        this.Status = false;
        this.connection.sendDeviceCommand(this._id, 'off');
    }
    Toggle(): void {
        if (this.Status) this.TurnOff();
        else this.TurnOn();
    }

    Open(): void {
        this.MovementStatus = BlindStatus.Opening;
        this.connection.sendDeviceCommand(this._id, 'open');
    }
    Close(): void {
        this.MovementStatus = BlindStatus.Closing;
        this.connection.sendDeviceCommand(this._id, 'close');
    }
    Stop(): void {
        this.MovementStatus = BlindStatus.Stop;
        this.connection.sendDeviceCommand(this._id, 'stop');
    }

    SetPosition(pos: number = this.Position): void {
        this.Position = pos;
        this.connection.sendDeviceCommand(this._id, pos.toString());
    }

    SetColor(col: Color = this.Color): void {
        this.Color = col;
        this.connection.sendDeviceCommand(this._id, col.GetHexColor());
    }
    GetColor(): Color {
        return this.Color;
    }
    LightenColor(amount: number = 15): void {
        this.Color.Lighten(amount);
        this.SetColor();
    }
    DarkenColor(amount: number = 15): void {
        this.Color.Darken(amount);
        this.SetColor();
    }

    SetTemperature(value: number = this.TargetTemperature): void {
        this.TargetTemperature = value;
        this.connection.sendDeviceCommand(this._id, value.toString());
    }
    IncreaseTemperature(amount: number = 1): void {
        this.TargetTemperature += amount;
        this.SetTemperature();
    }
    ReduceTemperature(amount: number = 1): void {
        this.TargetTemperature -= amount;
        this.SetTemperature();
    }
}
