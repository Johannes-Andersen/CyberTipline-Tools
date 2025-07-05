import type { ContactPerson, Person } from '../common/Person.js';
import type { WithRequired } from '../TypeUtils.js';

/**
 * Information related to the person or company reporting the incident.
 *
 * @see https://report.cybertip.org/ispws/documentation/index.html#reporter
 */
export interface Reporter {
  /** Information about the person reporting the incident. */
  reportingPerson: WithRequired<Person, 'email'>;
  /** Information about a person who should be contacted by law enforcement regarding the report other than the person submitting the report. */
  contactPerson?: ContactPerson;
  /** Language (not specific to the reported incident) that the reporting company wants included in the CyberTipline report,
   * e.g., basic company information, how legal process should be served, length of data retention, 24-hour emergency phone numbers. */
  companyTemplate?: string;
  /** Terms of Service (TOS) relevant to the incident being reported. */
  termsOfService?: string;
  /** A URL for a web page with further information. */
  legalUrl?: string;
}
