<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">File Picker</h3>
<p align="center"><strong><code>@robingenz/capacitor-file-picker</code></strong></p>
<p align="center">
  Capacitor plugin that allows the user to select a file.
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2022?style=flat-square" />
  <a href="https://github.com/robingenz/capacitor-file-picker/actions?query=workflow%3A%22CI%22"><img src="https://img.shields.io/github/workflow/status/robingenz/capacitor-file-picker/CI/main?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@robingenz/capacitor-file-picker"><img src="https://img.shields.io/npm/l/@robingenz/capacitor-file-picker?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/@robingenz/capacitor-file-picker"><img src="https://img.shields.io/npm/dw/@robingenz/capacitor-file-picker?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@robingenz/capacitor-file-picker"><img src="https://img.shields.io/npm/v/@robingenz/capacitor-file-picker?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer | GitHub                                    | Social                                        |
| ---------- | ----------------------------------------- | --------------------------------------------- |
| Robin Genz | [robingenz](https://github.com/robingenz) | [@robin_genz](https://twitter.com/robin_genz) |

## Installation

```bash
npm install @robingenz/capacitor-file-picker
npx cap sync
```

## Configuration

No configuration required for this plugin.

## Demo

A working example can be found here: [robingenz/capacitor-plugin-demo](https://github.com/robingenz/capacitor-plugin-demo)

## Usage

```typescript
import { FilePicker } from '@robingenz/capacitor-file-picker';

const pickFiles = async () => {
  const result = await FilePicker.pickFiles({
    types: ['image/png'],
    multiple: true,
  });
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
| **`size`**     | <code>number</code> | The size of the file.                                                                                                |


#### PickFilesOptions

| Prop           | Type                  | Description                                                                                                                                                                                                                                                                   |
| -------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`types`**    | <code>string[]</code> | List of accepted file types. Look at [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml) for a complete list of standard media types. This option cannot be used with `multiple: true` on Android. Example: `['image/png', 'application/pdf']` |
| **`multiple`** | <code>boolean</code>  | Whether multiple files may be selected. Default: `false`                                                                                                                                                                                                                      |
| **`readData`** | <code>boolean</code>  | Whether to read the file data. Default: `true`                                                                                                                                                                                                                                |

</docgen-api>

## Changelog

See [CHANGELOG.md](https://github.com/robingenz/capacitor-file-picker/blob/main/CHANGELOG.md).

## License

See [LICENSE](https://github.com/robingenz/capacitor-file-picker/blob/main/LICENSE).
