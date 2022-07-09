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
   * This option cannot be used with `multiple: true` on Android.
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
  /**
   * Whether to read the file data.
   *
   * Default: `true`
   */
  readData?: boolean;
}

export interface PickFilesResult {
  files: FileModel[];
}

export interface FileModel {
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
   *
   * Is only provided if `readData` is set to `true`.
   */
  data?: string;
  /**
   * The mime type of the file.
   */
  mimeType: string;
  /**
   * The size of the file in bytes.
   */
  size: number;

  /**
   * The File instance
   *
   * Only available on Web.
   *
   * {@Link https://developer.mozilla.org/en-US/docs/Web/API/File}
   */
  raw?: File;
}
