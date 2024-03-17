import { Device } from "../../";

export default interface IColorTemperature extends Device {
	ColorTemperature: number;
	MinColorTemperature: number;
	MaxColorTemperature: number;

	Lighten(): void;
	Darken(): void;

	SetColorTemperature(ColorTemperature: number): void;
}