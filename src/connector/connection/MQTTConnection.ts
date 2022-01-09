import { IBackendConnection } from ".";
import mqtt from "mqtt";
import { IRoomStructure } from '../interfaces/Rest';

export default class MQTTConnection implements IBackendConnection {
    public data: IRoomStructure[] = [];

    private client: mqtt.Client;

    constructor(uri: string) {
        this.client  = mqtt.connect(uri);
        
        this.client.on('connect', () => {
            this.client.subscribe('open-hg/full');
        })
        
        this.client.on('message', this.writeDataModel.bind(this));
    }

    public sendDeviceCommand(device: string, command: string): void {
        console.log(`Device Command for ${device}: ${command}`);
        this.client.publish(`open-hg/cmd/device/${device}`, command);
    }
    public sendRoomCommand(room: string, devType: string, command: string): void {
        this.client.publish(`open-hg/cmd/room/${room}/${devType}`, command);
    }

    private writeDataModel(topic: string, message: Buffer): void {
        try {
            this.data = JSON.parse(message.toString());
        }
        catch (err) {
            console.error(err);
        }
    }
}