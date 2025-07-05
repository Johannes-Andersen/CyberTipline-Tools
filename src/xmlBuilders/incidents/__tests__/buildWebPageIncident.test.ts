import { describe, it } from 'node:test';
import type { WebPageIncident } from '../../../types';
import { buildWebPageIncident } from '../buildWebPageIncident';

describe('buildWebPageIncident', () => {
  it('should build a web page incident', ({ assert }) => {
    const webPageIncident: WebPageIncident = {
      additionalInfo: 'This is a test',
      thirdPartyHostedContent: true,
      url: ['https://example.com', 'https://example.org'],
    };

    const result = buildWebPageIncident(webPageIncident);

    assert.snapshot(result);
  });
});
