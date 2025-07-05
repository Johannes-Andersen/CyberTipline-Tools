import { XMLBuilder } from 'fast-xml-parser';
import type { ChatImIncident } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildChatImIncident = (
  chatImIncident: ChatImIncident,
  keyName = 'chatImIncident',
): string =>
  builder.build({
    [keyName]: {
      chatClient: chatImIncident.chatClient,
      chatRoomName: chatImIncident.chatRoomName,
      content: chatImIncident.content,
      additionalInfo: chatImIncident.additionalInfo,
    },
  });
