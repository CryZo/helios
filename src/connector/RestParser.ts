
import { Color, Device, Room } from ".";
import { IRoomStructure } from "./interfaces/Rest";
import { IBackendConnection } from "./connection";

export default class RestParser {
    connection: IBackendConnection

    constructor (connection: IBackendConnection) {
        this.connection = connection;

    }

    ParseModel(model: IRoomStructure[]): Room[] {
        let ret: Room[] = [];

        model.forEach(r => {
            let room = new Room();
            room._id = r.id;
            room.Name = r.Name;
            room.Floor = r.Floor
            
            r.Devices.forEach(d => {
                let dev = new Device(this.connection);

                dev._id = d.id;
                dev.Name = d.Name;
                dev.Type = d.Type;
                dev.Traits = d.Traits;
                
                dev.Status = d.Status;
                if (d.Color) dev.Color = Color.Parse(d.Color);
                dev.Brightness = d.Brightness;
                dev.MovementStatus = d.MovementStatus;
                dev.Position = d.Position;
                dev.TargetTemperature = d.TargetTemperature;
                dev.Temperature = d.Temperature;
                dev.Humidity = d.Humidity;
                dev.Power = d.Power;
                dev.Energy = d.Energy;

                room.Devices.push(dev);
            });

            ret.push(room);
        });

        return ret;
    }
}
