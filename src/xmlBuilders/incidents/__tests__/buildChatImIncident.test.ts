import { describe, it } from 'node:test';
import type { ChatImIncident } from '../../../types';
import { buildChatImIncident } from '../buildChatImIncident';

describe('buildChatImIncident', () => {
  it('should build a chat im incident', ({ assert }) => {
    const chatImIncident: ChatImIncident = {
      additionalInfo: 'additionalInfo',
      chatRoomName: 'chatRoomName',
      chatClient: 'chatClient',
      content: 'content',
    };

    const result = buildChatImIncident(chatImIncident);

    assert.snapshot(result);
  });
});
