import type { DeviceId } from '../common/DeviceId.js';
import type { EstimatedLocation } from '../common/EstimatedLocation.js';
import type { IpCapture } from '../common/IpCapture.js';
import type { Person } from '../common/Person.js';

/**
 * A reported user or person involved in the incident. This person will be displayed as the suspect.
 *
 * @see https://report.cybertip.org/ispws/documentation/index.html#reported-person
 */
export interface PersonOrUserReported {
  /** Information about the reported person or user involved in the incident. */
  personOrUserReportedPerson?: Person;
  /** Description of the vehicle of the reported person. */
  vehicleDescription?: string;
  /** The unique ID of the reported person or user in the reporter’s system. */
  espIdentifier?: string;
  /** The name of the reporter’s product or service that was used by the reported person or user during the incident. */
  espService?: string;
  /** The screen/user name of the reported person or user. */
  screenName?: string;
  /** A display name, other than a screen name or a username, for the reported person or user. */
  displayName?: Array<string>;
  /** An identifying URL for the reported person or user. */
  profileUrl?: Array<string>;
  /** An IP address used by the reported person or user. */
  ipCaptureEvent?: Array<IpCapture>;
  /** An ID for a device used by the reported person or user. */
  deviceId?: Array<DeviceId>;
  /** Whether the reported person or user is using another company’s service and the reporting company has no further information about this person or user. */
  thirdPartyUserReported?: boolean;
  /** A report ID for a prior CyberTipline report on this reported person or user. */
  priorCTReports?: Array<number>;
  /** Unique group identifiers (e.g., group name, group ID) if the reporter believes the reported person or user is engaged in an online group related to child sexual exploitation. */
  groupIdentifier?: string;
  /** The reporter’s estimated location for the reported person or user. */
  estimatedLocation?: EstimatedLocation;
  /** Additional information about this reported person or user not covered by any other section. */
  additionalInfo?: string;
}
