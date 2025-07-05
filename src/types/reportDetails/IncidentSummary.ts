import type { IncidentType } from '../Constants/IncidentType';
import type { ReportAnnotation } from '../Constants/ReportAnnotation';

/**
 * General incident information.
 *
 * @see https://report.cybertip.org/ispws/documentation/index.html#incident-summary
 */
export interface IncidentSummary {
  /** The type of incident being reported. */
  incidentType: IncidentType;
  /** A reason for a higher level of urgency, e.g. immediate risk to child. Supplying a value will escalate the report.. */
  escalateToHighPriority?: string;
  /** Tags to describe the report. */
  reportAnnotations?: Partial<Record<ReportAnnotation, boolean>>;
  /** The date, time, and time zone of the reported incident. (ISO 8601 date and time) */
  incidentDateTime: Date;
  /** Additional information related to the incidentDateTime. */
  incidentDateTimeDescription?: string;
}
