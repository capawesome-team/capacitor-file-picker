import { WebPlugin } from '@capacitor/core';

import type {
  FilePickerPlugin,
  PickFilesOptions,
  PickFilesResult,
} from './definitions';

export class FilePickerWeb extends WebPlugin implements FilePickerPlugin {
  public readonly ERROR_PICK_FILE_CANCELED = 'pickFiles canceled.';

  public async pickFiles(options?: PickFilesOptions): Promise<PickFilesResult> {
    const files = await this.openFilePicker(options);
    if (!files) {
      throw new Error(this.ERROR_PICK_FILE_CANCELED);
    }
    const result: PickFilesResult = {
      files: [],
    };
    for (const file of files) {
      const name = this.getNameFromUrl(file);
      const data = await this.getDataFromFile(file);
      const mimeType = this.getMimeTypeFromUrl(file);
      const size = this.getSizeFromUrl(file);
      result.files.push({
        path: undefined,
        name,
        data,
        mimeType,
        size,
      });
    }
    return result;
  }

  private async openFilePicker(
    options?: PickFilesOptions,
  ): Promise<File[] | undefined> {
    const accept = options?.types?.join(',') || '';
    const multiple = !!options?.multiple;
    return new Promise(resolve => {
      let onChangeFired = false;
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.multiple = multiple;
      input.addEventListener(
        'change',
        () => {
          onChangeFired = true;
          const files = Array.from(input.files || []);
          resolve(files);
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
          resolve(undefined);
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
