export enum UserAlarmEnum {
    Current = 'Current',
    Voltage = 'Voltage',
    Power = 'Power',
}

export interface IUserAlarm {
    read: boolean;
    threshold: number;
    value: number;
    device: string;
    createdAt: number;
    type: UserAlarmEnum;
}

export interface IUser {
    _id?: string;
    username: string;
    password: string;
    alarms?: IUserAlarm[];
    createdAt?: number;
    updatedAt?: number;
}
