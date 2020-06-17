export interface IDevice {
    _id?: string;
    userId: string;
    name: string;
    key: string;
    description: string;
    isRunning: boolean;
    createdAt?: number;
    updatedAt?: number;
}
