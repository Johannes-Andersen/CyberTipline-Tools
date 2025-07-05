import { describe, it } from 'node:test';
import type { OnlineGamingIncident } from '../../../types';
import { buildOnlineGamingIncident } from '../buildOnlineGamingIncident';

describe('buildOnlineGamingIncident', () => {
  it('should build a online gaming incident', ({ assert }) => {
    const onlineGamingIncident: OnlineGamingIncident = {
      console: 'My Console',
      gameName: 'My Game',
      additionalInfo: 'This is a test',
      content: 'This is a test',
    };

    const result = buildOnlineGamingIncident(onlineGamingIncident);

    assert.snapshot(result);
  });
});
