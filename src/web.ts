import { WebPlugin } from '@capacitor/core';

import type {
  FilePickerPlugin,
  PickFilesOptions,
  PickFilesResult,
} from './definitions';

export class FilePickerWeb extends WebPlugin implements FilePickerPlugin {
  public readonly ERROR_PICK_FILE_CANCELED = 'pickFiles canceled.';

  public async pickFiles(options?: PickFilesOptions): Promise<PickFilesResult> {
    const file = await this.openFilePicker(options);
    if (!file) {
      throw new Error(this.ERROR_PICK_FILE_CANCELED);
    }
    const name = this.getNameFromUrl(file);
    const data = await this.getDataFromFile(file);
    const mimeType = this.getMimeTypeFromUrl(file);
    const size = this.getSizeFromUrl(file);
    // const result: PickFileResult = {
    //   name,
    //   data,
    //   mimeType,
    //   size,
    // };
    // return result;
    return {files: []}; // TODO
  }

  private async openFilePicker(
    options?: PickFilesOptions,
  ): Promise<File | null> {
    const accept = options?.types?.join(',') || '';
    return new Promise(resolve => {
      let onChangeFired = false;
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.addEventListener(
        'change',
        () => {
          onChangeFired = true;
          const file = input.files?.item(0) || null;
          resolve(file);
        },
        { once: true },
      );
      // Workaround to detect when Cancel is selected in the File Selection dialog box.
      window.addEventListener(
        'focus',
        async () => {
          await this.wait(300);
          if (onChangeFired) {
            return;
          }
          resolve(null);
        },
        { once: true },
      );
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

  private async wait(delayMs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, delayMs));
  }
}
