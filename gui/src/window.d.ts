import { IBackendConnection } from "@connector/connection";
import { Room } from "@connector";

declare global {
    interface Window {
        backendConnection: IBackendConnection;
        rooms: Room[];
    }
}