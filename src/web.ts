import { WebPlugin } from '@capacitor/core';

import type { FilePickerPlugin, OpenResult } from './definitions';

export class FilePickerWeb extends WebPlugin implements FilePickerPlugin {
  async pickFile(): Promise<OpenResult> {
    throw new Error('Not implemented on web.');
  }
}
