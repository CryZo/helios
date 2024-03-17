import { Device } from "../../";

export default interface IColorTemperature extends Device {
	ColorTemperature: number;
	MinColorTemperature: number;
	MaxColorTemperature: number;

	SetColorTemperature(ColorTemperature: number): void;
}