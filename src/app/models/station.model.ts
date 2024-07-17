import { Sensor } from './sensor.model';

export type Station = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  active: boolean;
  createdAt: Date;
  userId: string;
  sensors: Sensor[];
};
