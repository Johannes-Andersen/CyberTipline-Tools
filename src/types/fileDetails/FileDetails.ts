/**
 * The type of the metadata entry.
 */
export enum FileDetailType {
  EXIF = 'EXIF',
  HASH = 'HASH',
}

/**
 * Metadata associated with a file.
 *
 * @interface FileDetails
 * @see https://report.cybertip.org/ispws/documentation/index.html#details
 */
export interface FileDetails {
  /** The name-value pairs of the metadata entries. */
  valuePair: Array<{
    /** The name of the metadata entry. */
    name: string;
    /** The value of the metadata entry. */
    value: string;
  }>;
  /** The type of the metadata entry. */
  type?: FileDetailType;
}
