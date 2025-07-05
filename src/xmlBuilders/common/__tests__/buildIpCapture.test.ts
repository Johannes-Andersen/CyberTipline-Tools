import { describe, it } from 'node:test';
import { IPEventName, type IpCapture } from '../../../types';
import { buildIpCapture } from '../buildIpCapture';

describe('buildIpCapture', () => {
  it('should build a login ip capture with no proxy', ({ assert }) => {
    const ipCapture: IpCapture = {
      dateTime: new Date('2024-01-01T00:00:00.000Z'),
      ipAddress: '127.0.0.1',
      eventName: IPEventName.Login,
      possibleProxy: false,
      port: 80,
    };

    const result = buildIpCapture(ipCapture);

    assert.snapshot(result);
  });

  it('should build a login ip capture with a proxy', ({ assert }) => {
    const ipCapture: IpCapture = {
      dateTime: new Date('2024-01-01T00:00:00.000Z'),
      ipAddress: '127.0.0.1',
      eventName: IPEventName.Login,
      possibleProxy: true,
      port: 80,
    };

    const result = buildIpCapture(ipCapture);

    assert.snapshot(result);
  });

  it('should build a login ip capture with unknown proxy status', ({
    assert,
  }) => {
    const ipCapture: IpCapture = {
      ipAddress: '127.0.0.1',
      eventName: IPEventName.Login,
    };

    const result = buildIpCapture(ipCapture);

    assert.snapshot(result);
  });
});
