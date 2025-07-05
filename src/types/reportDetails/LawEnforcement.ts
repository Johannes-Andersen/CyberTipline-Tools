import type { Country } from '../Constants/Country.js';
import type { ContactPerson } from '../common/Person.js';

/**
 * Law enforcement contact information if the incident information has already been reported to law enforcement
 * or if the request originated from law enforcement.
 *
 * @see https://report.cybertip.org/ispws/documentation/index.html#law-enforcement
 */
export interface LawEnforcement {
  /** The law enforcement agency name. */
  agencyName: string;
  /** The law enforcement agency case number. */
  caseNumber?: string;
  /** Information about the investigator or officer assigned to the case. */
  officerContact?: ContactPerson;
  /** Whether the incident was reported to law enforcement by the reporter. */
  reportedToLe?: boolean;
  /** Whether domestic law enforcement has served legal process about this person/user or reported incident. */
  servedLegalProcessDomestic?: boolean;
  /** Whether international law enforcement has served legal process about this person/user or reported incident. */
  servedLegalProcessInternational?:
    | boolean
    | {
        /** The country associated with this report from which legal process was received. */
        fleaCountry: Country;
      };
}
