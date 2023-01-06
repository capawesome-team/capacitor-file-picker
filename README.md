<p align="center"><br><img src="https://avatars.githubusercontent.com/u/105555861" width="128" height="128" /></p>
<h3 align="center">File Picker</h3>
<p align="center"><strong><code>@capawesome/capacitor-file-picker</code></strong></p>
<p align="center">
  Capacitor plugin that allows the user to select a file.
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2023?style=flat-square" />
  <a href="https://github.com/capawesome-team/capacitor-file-picker/actions?query=workflow%3A%22CI%22"><img src="https://img.shields.io/github/actions/workflow/status/capawesome-team/capacitor-file-picker/ci.yml?branch=main&style=flat-square" /></a>
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
* [`pickImages(...)`](#pickimages)
* [`pickMedia(...)`](#pickmedia)
* [`pickVideos(...)`](#pickvideos)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

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


### pickImages(...)

```typescript
pickImages(options?: PickMediaOptions | undefined) => Promise<PickImagesResult>
```

Pick one or more images from the gallery.

On iOS 13 and older it only allows to pick one image.

Only available on Android and iOS.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#pickmediaoptions">PickMediaOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#pickmediaresult">PickMediaResult</a>&gt;</code>

**Since:** 0.5.3

--------------------


### pickMedia(...)

```typescript
pickMedia(options?: PickMediaOptions | undefined) => Promise<PickMediaResult>
```

Pick one or more images or videos from the gallery.

On iOS 13 and older it only allows to pick one image or video.

Only available on Android and iOS.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#pickmediaoptions">PickMediaOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#pickmediaresult">PickMediaResult</a>&gt;</code>

**Since:** 0.5.3

--------------------


### pickVideos(...)

```typescript
pickVideos(options?: PickMediaOptions | undefined) => Promise<PickVideosResult>
```

Pick one or more videos from the gallery.

On iOS 13 and older it only allows to pick one video.

Only available on Android and iOS.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#pickmediaoptions">PickMediaOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#pickmediaresult">PickMediaResult</a>&gt;</code>

**Since:** 0.5.3

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

| Prop           | Type                  | Description                                                                                                                                                                                                                       | Default            |
| -------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`types`**    | <code>string[]</code> | List of accepted file types. Look at [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml) for a complete list of standard media types. This option cannot be used with `multiple: true` on Android. |                    |
| **`multiple`** | <code>boolean</code>  | Whether multiple files may be selected.                                                                                                                                                                                           | <code>false</code> |
| **`readData`** | <code>boolean</code>  | Whether to read the file data.                                                                                                                                                                                                    | <code>false</code> |


#### PickMediaResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`files`** | <code>File[]</code> |


#### PickMediaOptions

| Prop           | Type                 | Description                             | Default            |
| -------------- | -------------------- | --------------------------------------- | ------------------ |
| **`multiple`** | <code>boolean</code> | Whether multiple files may be selected. | <code>false</code> |
| **`readData`** | <code>boolean</code> | Whether to read the file data.          | <code>false</code> |


### Type Aliases


#### PickImagesOptions

<code><a href="#pickmediaoptions">PickMediaOptions</a></code>


#### PickImagesResult

<code><a href="#pickmediaresult">PickMediaResult</a></code>


#### PickVideosOptions

<code><a href="#pickmediaoptions">PickMediaOptions</a></code>


#### PickVideosResult

<code><a href="#pickmediaresult">PickMediaResult</a></code>

</docgen-api>

## Changelog

See [CHANGELOG.md](https://github.com/capawesome-team/capacitor-file-picker/blob/main/CHANGELOG.md).

## License

See [LICENSE](https://github.com/capawesome-team/capacitor-file-picker/blob/main/LICENSE).
