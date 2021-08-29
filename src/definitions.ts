export interface FilePickerPlugin {
  /**
   * Open the file picker that allows the user to select a file.
   */
  pickFile(options?: PickFileOptions): Promise<PickFileResult>;
}

export interface PickFileOptions {
  /**
   * Array of valid media types.
   * Look at [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml) for a complete list of standard media types.
   */
  types?: string[];
}

export interface PickFileResult {
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
