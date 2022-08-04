<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">File Picker</h3>
<p align="center"><strong><code>@capawesome/capacitor-file-picker</code></strong></p>
<p align="center">
  Capacitor plugin that allows the user to select a file.
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2022?style=flat-square" />
  <a href="https://github.com/capawesome-team/capacitor-file-picker/actions?query=workflow%3A%22CI%22"><img src="https://img.shields.io/github/workflow/status/capawesome-team/capacitor-file-picker/CI/main?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capawesome/capacitor-file-picker"><img src="https://img.shields.io/npm/l/@capawesome/capacitor-file-picker?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/@capawesome/capacitor-file-picker"><img src="https://img.shields.io/npm/dw/@capawesome/capacitor-file-picker?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capawesome/capacitor-file-picker"><img src="https://img.shields.io/npm/v/@capawesome/capacitor-file-picker?style=flat-square" /></a>
  <a href="https://github.com/capawesome-team"><img src="https://img.shields.io/badge/part%20of-capawesome-%234f46e5?style=flat-square" /></a>
</p>

## Maintainers

| Maintainer | GitHub                                    | Social                                        |
| ---------- | ----------------------------------------- | --------------------------------------------- |
| Robin Genz | [robingenz](https://github.com/robingenz) | [@robin_genz](https://twitter.com/robin_genz) |

## Sponsors

This is an MIT-licensed open source project.
It can grow thanks to the support by these awesome people.
If you'd like to join them, please read more [here](https://github.com/sponsors/capawesome-team).

<!-- sponsors --><!-- sponsors -->

## Installation

```bash
npm install @capawesome/capacitor-file-picker
npx cap sync
```

## Configuration

No configuration required for this plugin.

## Demo

A working example can be found here: [robingenz/capacitor-plugin-demo](https://github.com/robingenz/capacitor-plugin-demo)

## Usage

```typescript
import { FilePicker } from '@capawesome/capacitor-file-picker';

const pickFiles = async () => {
  const result = await FilePicker.pickFiles({
    types: ['image/png'],
    multiple: true,
  });
};

const appendFileToFormData = async () => {
  const result = await FilePicker.pickFiles();
  const file = result.files[0];

  const formData = new FormData();
  if (file.blob) {
    const rawFile = new File(file.blob, file.name, {
      type: file.mimeType,
    });
    formData.append('file', rawFile, file.name);
  }
};
```

## API

<docgen-index>

* [`pickFiles(...)`](#pickfiles)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### pickFiles(...)

```typescript
pickFiles(options?: PickFilesOptions | undefined) => Promise<PickFilesResult>
```

Open the file picker that allows the user to select one or more files.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#pickfilesoptions">PickFilesOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#pickfilesresult">PickFilesResult</a>&gt;</code>

--------------------


### Interfaces


#### PickFilesResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`files`** | <code>File[]</code> |


#### File

| Prop           | Type                | Description                                                                                                          |
| -------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **`path`**     | <code>string</code> | The path of the file. Only available on Android and iOS.                                                             |
| **`name`**     | <code>string</code> | The name of the file.                                                                                                |
| **`data`**     | <code>string</code> | The Base64 string representation of the data contained in the file. Is only provided if `readData` is set to `true`. |
| **`mimeType`** | <code>string</code> | The mime type of the file.                                                                                           |
| **`size`**     | <code>number</code> | The size of the file in bytes.                                                                                       |
| **`blob`**     | <code>Blob</code>   | The Blob instance of the file. Only available on Web.                                                                |


#### PickFilesOptions

| Prop           | Type                  | Description                                                                                                                                                                                                                                                                   |
| -------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`types`**    | <code>string[]</code> | List of accepted file types. Look at [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml) for a complete list of standard media types. This option cannot be used with `multiple: true` on Android. Example: `['image/png', 'application/pdf']` |
| **`multiple`** | <code>boolean</code>  | Whether multiple files may be selected. Default: `false`                                                                                                                                                                                                                      |
| **`readData`** | <code>boolean</code>  | Whether to read the file data. Default: `true`                                                                                                                                                                                                                                |

</docgen-api>

## Changelog

See [CHANGELOG.md](https://github.com/capawesome-team/capacitor-file-picker/blob/main/CHANGELOG.md).

## License

See [LICENSE](https://github.com/capawesome-team/capacitor-file-picker/blob/main/LICENSE).
