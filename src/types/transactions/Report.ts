import type { ResponseCode } from '../Constants/ResponseCode';
import type { CellPhoneIncident } from '../incidents/CellPhoneIncident.js';
import type { ChatImIncident } from '../incidents/ChatImIncident.js';
import type { EmailIncident } from '../incidents/EmailIncident.js';
import type { NewsgroupIncident } from '../incidents/NewsgroupIncident.js';
import type { NonInternetIncident } from '../incidents/NonInternetIncident.js';
import type { OnlineGamingIncident } from '../incidents/OnlineGamingIncident.js';
import type { Peer2peerIncident } from '../incidents/Peer2peerIncident.js';
import type { WebPageIncident } from '../incidents/WebPageIncident.js';
import type { IncidentSummary } from '../reportDetails/IncidentSummary.js';
import type { IntendedRecipient } from '../reportDetails/IntendedRecipient.js';
import type { LawEnforcement } from '../reportDetails/LawEnforcement.js';
import type { PersonOrUserReported } from '../reportDetails/PersonOrUserReported.js';
import type { Reporter } from '../reportDetails/Reporter.js';
import type { Victim } from '../reportDetails/Victim.js';

/**
 * Request properties for the Report endpoint.
 *
 * @see https://report.cybertip.org/ispws/documentation/index.html#report-details-types
 */
export interface Report {
  /** General incident information. */
  incidentSummary: IncidentSummary;
  /** Details of an incident being reported. */
  incidentDetails?: {
    /** List of cell phone incidents. */
    cellPhoneIncidents?: Array<CellPhoneIncident>;
    /** List of chat or instant messaging incidents. */
    chatImIncidents?: Array<ChatImIncident>;
    /** List of email incidents. */
    emailIncidents?: Array<EmailIncident>;
    /** List of newsgroup incidents. */
    newsgroupIncidents?: Array<NewsgroupIncident>;
    /** List of non-internet incidents. */
    nonInternetIncidents?: Array<NonInternetIncident>;
    /** List of online gaming incidents. */
    onlineGamingIncidents?: Array<OnlineGamingIncident>;
    /** List of peer-to-peer incidents. */
    peer2peerIncidents?: Array<Peer2peerIncident>;
    /** List of web page incidents. */
    webPageIncidents?: Array<WebPageIncident>;
  };
  /** Law enforcement contact information if the incident information has already been reported to law enforcement or if the request originated from law enforcement. */
  lawEnforcement?: LawEnforcement;
  /** Information related to the person or company reporting the incident. */
  reporter: Reporter;
  /** The reported user or person involved in the incident. This person will be displayed as the suspect. */
  personOrUserReported?: PersonOrUserReported;
  /** An intended recipient(s) involved in the incident. */
  intendedRecipient?: Array<IntendedRecipient>;
  /** The victim(s) of the incident. */
  victim?: Array<Victim>;
  /** Additional notes on this incident not covered by any other section. */
  additionalInfo?: string;
}

/**
 * Response properties for the Report endpoint.
 */
export interface ReportResponse {
  /** The response code returned from the submittal. Response code 0 indicates successful report submission, any non-zero number is an error code. */
  responseCode: ResponseCode | number;
  /** A description of the response code. */
  responseDescription: string;
  /** Report ID assigned to the submitted report. */
  reportId: number;
}
