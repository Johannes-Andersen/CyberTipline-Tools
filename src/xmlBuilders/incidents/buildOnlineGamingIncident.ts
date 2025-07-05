import { XMLBuilder } from 'fast-xml-parser';
import type { OnlineGamingIncident } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildOnlineGamingIncident = (
  onlineGamingIncident: OnlineGamingIncident,
  keyName = 'onlineGamingIncident',
): string =>
  builder.build({
    [keyName]: {
      gameName: onlineGamingIncident.gameName,
      console: onlineGamingIncident.console,
      content: onlineGamingIncident.content,
      additionalInfo: onlineGamingIncident.additionalInfo,
    },
  });
