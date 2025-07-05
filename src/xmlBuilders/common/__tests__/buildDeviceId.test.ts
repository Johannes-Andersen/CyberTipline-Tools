import { describe, it } from 'node:test';
import { DeviceEventName, type DeviceId } from '../../../types';
import { buildDeviceId } from '../buildDeviceId';

describe('buildDeviceId', () => {
  it('should build a device ID', ({ assert }) => {
    const deviceId: DeviceId = {
      dateTime: new Date('2024-01-01T00:00:00.000Z'),
      idType: 'idType',
      idValue: 'idValue',
      eventName: DeviceEventName.Purchase,
    };

    const result = buildDeviceId(deviceId);

    assert.snapshot(result);
  });
});
