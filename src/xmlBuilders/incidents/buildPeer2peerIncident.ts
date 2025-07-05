import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { Peer2peerIncident } from '../../types';
import { buildIpCapture } from '../common/buildIpCapture';

const parser = new XMLParser({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  allowBooleanAttributes: true,
});

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildPeer2peerIncident = (
  peer2peerIncident: Peer2peerIncident,
  keyName = 'peer2peerIncident',
): string =>
  builder.build({
    [keyName]: {
      client: peer2peerIncident.client,
      ipCaptureEvent: peer2peerIncident.ipCaptureEvent?.map(
        (e) => parser.parse(buildIpCapture(e)).ipCaptureEvent,
      ),
      fileNames: peer2peerIncident.fileNames,
      additionalInfo: peer2peerIncident.additionalInfo,
    },
  });
