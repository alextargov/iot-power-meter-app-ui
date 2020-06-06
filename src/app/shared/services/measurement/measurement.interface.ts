export interface IMeasurement {
    id?: string;
    appliance: string;
    current: number;
    voltage: number;
    power?: number;

    createdAt?: number;
    updatedAt?: number;
}
