import { WebPlugin } from '@capacitor/core';

import type { FilePickerPlugin, PickFileResult } from './definitions';

export class FilePickerWeb extends WebPlugin implements FilePickerPlugin {
  public readonly ERROR_PICK_FILE_CANCELED = 'pickFile canceled.';

  public async pickFile(): Promise<PickFileResult> {
    const file = await this.openFilePicker();
    if (!file) {
      throw new Error(this.ERROR_PICK_FILE_CANCELED);
    }
    const name = this.getNameFromUrl(file);
    const data = await this.getDataFromFile(file);
    const mimeType = this.getMimeTypeFromUrl(file);
    const size = this.getSizeFromUrl(file);
    const result: PickFileResult = {
      name,
      data,
      mimeType,
      size,
    };
    return result;
  }

  private async openFilePicker(): Promise<File | null> {
    return new Promise(resolve => {
      const input = document.createElement('input');
      input.type = 'file';
      input.id = 'capacitor-file-picker';
      input.onchange = () => {
        const file = input.files?.item(0) || null;
        resolve(file);
        document.body.removeChild(input);
      };
      document.body.appendChild(input);
      input.click();
    });
  }

  private async getDataFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = typeof reader.result === 'string' ? reader.result : '';
        const splittedResult = result.split('base64,');
        const base64 = splittedResult[1] || '';
        resolve(base64);
      };
      reader.onerror = error => {
        reject(error);
      };
    });
  }

  private getNameFromUrl(file: File): string {
    return file.name;
  }

  private getMimeTypeFromUrl(file: File): string {
    return file.type;
  }

  private getSizeFromUrl(file: File): number {
    return file.size;
  }
}
