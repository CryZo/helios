import { Color } from ".";
import { BlindStatus, DeviceType, Trait } from "./Enums";
import { IBackendConnection } from "./connection";

export default class Device {
    _id!: string;
    Name!: string;
    Type!: DeviceType;
    Traits: Trait[] = [];

    Battery?: number;
    Brightness?: number;
    Energy?: number;
    Humidity?: number;
    Illumination?: number;
    Lux?: number;
    Status?: boolean;
    MovementStatus?: BlindStatus;
    Position?: number;
    Power?: number;
    Color?: Color;
    Temperature?: number;
    IsRoomTemperature?: boolean;
    TargetTemperature?: number;
    AutomationTemperature?: number;
    Vibration?: boolean;
	ColorTemperature?: number;
	MinColorTemperature?: number;
	MaxColorTemperature?: number;

    connection!: IBackendConnection

    constructor(connection: IBackendConnection) {
        this.connection = connection;
    }

    Lighten(amount: number = 15): void {
        if (this.Brightness === undefined)
            return;

		this.Brightness += amount;
		if (this.Brightness > 100)
			this.Brightness = 100;

		this.SetBrightness();
    }
    Darken(amount: number = 15): void {
        if (this.Brightness === undefined)
            return;

		this.Brightness -= amount;
		if (this.Brightness < 0)
			this.Brightness = 0;

		this.SetBrightness();
    }
    SetBrightness(value?: number): void {
        if (this.Brightness === undefined)
            return;

        if (value === undefined)
            value = this.Brightness;

        this.connection.sendDeviceCommand(this._id, value.toString());
    }

    TurnOn(): void {
        if (this.Status === undefined)
            return;

        this.Status = true;
        this.connection.sendDeviceCommand(this._id, 'on');
    }
    TurnOff(): void {
        if (this.Status === undefined)
            return;

        this.Status = false;
        this.connection.sendDeviceCommand(this._id, 'off');
    }
    Toggle(): void {
        if (this.Status === undefined)
            return;

        if (this.Status) this.TurnOff();
        else this.TurnOn();
    }

    Open(): void {
        if (this.MovementStatus === undefined)
            return;

        this.MovementStatus = BlindStatus.Opening;
        this.connection.sendDeviceCommand(this._id, 'open');
    }
    Close(): void {
        if (this.MovementStatus === undefined)
            return;

        this.MovementStatus = BlindStatus.Closing;
        this.connection.sendDeviceCommand(this._id, 'close');
    }
    Stop(): void {
        if (this.MovementStatus === undefined)
            return;

        this.MovementStatus = BlindStatus.Stop;
        this.connection.sendDeviceCommand(this._id, 'stop');
    }

    SetPosition(pos?: number): void {
        if (this.Position === undefined)
            return;

        if (pos === undefined)
            pos = this.Position;

        this.Position = pos;
        this.connection.sendDeviceCommand(this._id, pos.toString());
    }

    SetColor(col?: Color): void {
        if (this.Color === undefined)
            return;

        if (col === undefined)
            col = this.Color;

        this.Color = col;
        this.connection.sendDeviceCommand(this._id, col.GetHexColor());
    }
    GetColor(): Color {
        if (this.Color === undefined)
            return Color.GetBlack();

        return this.Color;
    }
    LightenColor(amount: number = 15): void {
        if (this.Color === undefined)
            return;

        this.Color.Lighten(amount);
        this.SetColor();
    }
    DarkenColor(amount: number = 15): void {
        if (this.Color === undefined)
            return;

        this.Color.Darken(amount);
        this.SetColor();
    }

    SetTemperature(value?: number): void {
        if (this.TargetTemperature === undefined)
            return;

        if (value === undefined)
            value = this.TargetTemperature;

        this.TargetTemperature = value;
        this.connection.sendDeviceCommand(this._id, value.toString());
    }
    IncreaseTemperature(amount: number = 1): void {
        if (this.TargetTemperature === undefined)
            return;

        this.TargetTemperature += amount;
        this.SetTemperature();
    }
    ReduceTemperature(amount: number = 1): void {
        if (this.TargetTemperature === undefined)
            return;

        this.TargetTemperature -= amount;
        this.SetTemperature();
    }

	SetColorTemperature(ColorTemperature: number): void {
        this.ColorTemperature = ColorTemperature;
        this.connection.sendDeviceCommand(this._id, ColorTemperature.toString());
    }
}
