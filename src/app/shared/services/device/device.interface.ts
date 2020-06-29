export interface IDevice {
    _id?: string;
    userId: string;
    name: string;
    deviceId: string;
    host: string;
    key: string;
    description: string;
    isRunning: boolean;
    isCurrentAlarmEnabled: boolean;
    isVoltageAlarmEnabled: boolean;
    isPowerAlarmEnabled: boolean;
    currentAlarmThreshold: number;
    voltageAlarmThreshold: number;
    powerAlarmThreshold: number;
    createdAt?: number;
    updatedAt?: number;
}
