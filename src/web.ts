import { WebPlugin } from '@capacitor/core';

import type { FilePickerPlugin } from './definitions';

export class FilePickerWeb extends WebPlugin implements FilePickerPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
