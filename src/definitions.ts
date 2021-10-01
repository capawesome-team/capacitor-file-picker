export interface FilePickerPlugin {
  /**
   * Open the file picker that allows the user to select one or more files.
   */
  pickFiles(options?: PickFilesOptions): Promise<PickFilesResult>;
}

export interface PickFilesOptions {
  /**
   * List of accepted file types.
   * Look at [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml) for a complete list of standard media types.
   *
   * Example: `['image/png', 'application/pdf']`
   */
  types?: string[];
  /**
   * Whether multiple files may be selected.
   *
   * Default: `false`
   */
  multiple?: boolean;
}

export interface PickFilesResult {
  files: File[];
}

export interface File {
  /**
   * The path of the file.
   *
   * Only available on Android and iOS.
   */
  path?: string;
  /**
   * The name of the file.
   */
  name: string;
  /**
   * The Base64 string representation of the data contained in the file.
   */
  data: string;
  /**
   * The mime type of the file.
   */
  mimeType: string;
  /**
   * The size of the file.
   */
  size: number;
}
