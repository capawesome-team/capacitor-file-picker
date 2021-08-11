export interface FilePickerPlugin {
  pickFile(): Promise<PickFileResult>;
}

export interface PickFileResult {
  uri: string;
}
