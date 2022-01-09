import { IRoomStructure } from '../interfaces/Rest';

export default interface IBackendConnection {
    data: IRoomStructure[];

    sendDeviceCommand(device: string, command: string): void;
    sendRoomCommand(room: string, devType: string, command: string): void;
}