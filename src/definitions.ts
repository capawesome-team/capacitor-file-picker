export interface FilePickerPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
