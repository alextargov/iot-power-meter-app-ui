export interface IMeasurement {
    id?: string;
    appliance: string;
    current: number;
    voltage: number;
    power?: number;

    createdAt?: Date;
    updatedAt?: Date;
}
