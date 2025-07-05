export enum FileRelevance {
  /** Content that is the motivation for making the CyberTipline report, according to the chosen incident type.
   *
   * Only "Reported" files may be identified as potential meme or be given an industry classification.
   */
  Reported = 'Reported',
  /** Supplementary content that provides contextual value to the report.
   *
   * A part of the communication containing apparent child pornography, including any data or information regarding the transmission of the communication
   * or any images, data, or other digital files contained in, or attached to, the communication (18 U.S. Code § 2258A (b)(5)).
   */
  SupplementalReported = 'Supplemental Reported',
}
