export interface FilePickerPlugin {
  /**
   * Open the file picker that allows the user to select a file.
   */
  pickFile(): Promise<PickFileResult>;
}

export interface PickFileResult {
  /**
   * The path of the file.
   */
  path: string;
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
