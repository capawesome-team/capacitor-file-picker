export interface FilePickerPlugin {
  pickFile(): Promise<PickFileResult>;
}

export interface PickFileResult {
  filePath: string;
  fileName: string;
}
