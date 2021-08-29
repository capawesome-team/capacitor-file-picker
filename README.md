<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">File Picker</h3>
<p align="center"><strong><code>@robingenz/capacitor-file-picker</code></strong></p>
<p align="center">
  Capacitor plugin that allows the user to select a file.
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2021?style=flat-square" />
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

const pickFile = async () => {
  const result = await FilePicker.pickFile();
};
```

## API

<docgen-index>

* [`pickFile()`](#pickfile)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### pickFile()

```typescript
pickFile() => Promise<PickFileResult>
```

Open the file picker that allows the user to select a file.

**Returns:** <code>Promise&lt;<a href="#pickfileresult">PickFileResult</a>&gt;</code>

--------------------


### Interfaces


#### PickFileResult

| Prop           | Type                | Description                                                         |
| -------------- | ------------------- | ------------------------------------------------------------------- |
| **`path`**     | <code>string</code> | The path of the file. Only available on Android and iOS.            |
| **`name`**     | <code>string</code> | The name of the file.                                               |
| **`data`**     | <code>string</code> | The Base64 string representation of the data contained in the file. |
| **`mimeType`** | <code>string</code> | The mime type of the file.                                          |
| **`size`**     | <code>number</code> | The size of the file.                                               |

</docgen-api>

## Changelog

See [CHANGELOG.md](https://github.com/robingenz/capacitor-file-picker/blob/master/CHANGELOG.md).

## License

See [LICENSE](https://github.com/robingenz/capacitor-file-picker/blob/master/LICENSE).
