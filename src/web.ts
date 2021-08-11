import { WebPlugin } from '@capacitor/core';

import type { FilePickerPlugin, PickFileResult } from './definitions';

export class FilePickerWeb extends WebPlugin implements FilePickerPlugin {
  async pickFile(): Promise<PickFileResult> {
    throw new Error('Not implemented on web.');
  }
}
