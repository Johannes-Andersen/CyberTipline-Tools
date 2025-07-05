/**
 * Tags to describe the report.
 * @see https://report.cybertip.org/ispws/documentation/index.html#report-annotations
 */
export enum ReportAnnotation {
  /** The report is associated with sextortion. */
  Sextortion = 'sextortion',
  /** The report is associated with solicitation of child sexual assault material (CSAM). */
  CsamSolicitation = 'csamSolicitation',
  /** The report is associated with an interaction between minors. */
  MinorToMinorInteraction = 'minorToMinorInteraction',
  /** The report is associated with spam. */
  Spam = 'spam',
}
