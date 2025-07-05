import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { ContactPerson, Person } from '../../types';
import { buildAddress } from './buildAddress';
import { buildEmail } from './buildEmail';
import { buildPhone } from './buildPhone';

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

export const buildPerson = (person: Person, keyName = 'person'): string => {
  const { phone, email, address } = person;

  const phones = phone?.map((e) => parser.parse(buildPhone(e)).phone);
  const emails = email?.map((e) => parser.parse(buildEmail(e)).email);
  const addresses = address?.map((e) => parser.parse(buildAddress(e)).address);

  return builder.build({
    [keyName]: {
      firstName: person.firstName,
      lastName: person.lastName,
      phone: phones,
      email: emails,
      address: addresses,
      age: person.age,
      dateOfBirth: person.dateOfBirth?.toISOString().split('T')[0],
    },
  });
};

export const buildContactPerson = (
  person: ContactPerson,
  keyName = 'contactPerson',
): string => {
  const { phone, email, address } = person;

  const phones = phone?.map((e) => parser.parse(buildPhone(e)).phone);
  const emails = email?.map((e) => parser.parse(buildEmail(e)).email);
  const addresses = address?.map((e) => parser.parse(buildAddress(e)).address);

  return builder.build({
    [keyName]: {
      firstName: person.firstName,
      lastName: person.lastName,
      phone: phones,
      email: emails,
      address: addresses,
    },
  });
};
