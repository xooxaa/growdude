import { SensorData } from './sensordata.model';

export type Sensor = {
  id: string;
  name: string;
  description: string;
  type: string;
  unit: string;
  active: boolean;
  createdAt: Date;
  stationId: string;
  userId: string;
  latest: SensorData;
};
