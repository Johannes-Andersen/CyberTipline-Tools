import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { CellPhoneIncident } from '../../types';
import { buildPhone } from '../common/buildPhone';

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

export const buildCellPhoneIncident = (
  cellPhoneIncident: CellPhoneIncident,
  keyName = 'cellPhoneIncident',
): string =>
  builder.build({
    [keyName]: {
      phoneNumber: cellPhoneIncident.phoneNumber
        ? parser.parse(buildPhone(cellPhoneIncident.phoneNumber)).phone
        : undefined,
      latitude: cellPhoneIncident.latitude,
      longitude: cellPhoneIncident.longitude,
      additionalInfo: cellPhoneIncident.additionalInfo,
    },
  });
