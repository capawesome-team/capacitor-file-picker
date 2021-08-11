export interface FilePickerPlugin {
  pickFile(): Promise<OpenResult>;
}

export interface OpenResult {
  uri: string;
}
