export interface FilePickerPlugin {
  /**
   * Pick a directory.
   * 
   * Returns a security-scoped URL for the directory that permits your app to access content outside its container.
   * 
   * Only available on Android and iOS.
   * 
   * @since 0.5.7
   */
  pickDirectory(): Promise<PickDirectoryResult>;
  /**
   * Open the file picker that allows the user to select one or more files.
   */
  pickFiles(options?: PickFilesOptions): Promise<PickFilesResult>;
  /**
   * Pick one or more images from the gallery.
   *
   * On iOS 13 and older it only allows to pick one image.
   *
   * Only available on Android and iOS.
   *
   * @since 0.5.3
   */
  pickImages(options?: PickImagesOptions): Promise<PickImagesResult>;
  /**
   * Pick one or more images or videos from the gallery.
   *
   * On iOS 13 and older it only allows to pick one image or video.
   *
   * Only available on Android and iOS.
   *
   * @since 0.5.3
   */
  pickMedia(options?: PickMediaOptions): Promise<PickMediaResult>;
  /**
   * Pick one or more videos from the gallery.
   *
   * On iOS 13 and older it only allows to pick one video.
   *
   * Only available on Android and iOS.
   *
   * @since 0.5.3
   */
  pickVideos(options?: PickVideosOptions): Promise<PickVideosResult>;
}

/**
 * @since 0.5.7
 */
export interface PickDirectoryResult {
  /**
   * The path of the directory.
   * 
   * @since 0.5.7
   */
  path: string;
}

export interface PickFilesOptions {
  /**
   * List of accepted file types.
   * Look at [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml) for a complete list of standard media types.
   *
   * This option cannot be used with `multiple: true` on Android.
   *
   * @example ['image/png', 'application/pdf']
   */
  types?: string[];
  /**
   * Whether multiple files may be selected.
   *
   * @default false
   */
  multiple?: boolean;
  /**
   * Whether to read the file data.
   *
   * @default false
   */
  readData?: boolean;
}

export interface PickFilesResult {
  files: PickedFile[];
}

/**
 * @since 0.5.3
 */
export type PickedFile = File;

/**
 * @deprecated Use `PickedFile` instead.
 */
export interface File {
  /**
   * The Blob instance of the file.
   *
   * Only available on Web.
   */
  blob?: Blob;
  /**
   * The Base64 string representation of the data contained in the file.
   *
   * Is only provided if `readData` is set to `true`.
   */
  data?: string;
  /**
   * The duration of the video in milliseconds.
   *
   * Only available on Android and iOS.
   *
   * @since 0.5.3
   */
  duration?: number;
  /**
   * The height of the image or video in pixels.
   *
   * Only available on Android and iOS.
   *
   * @since 0.5.3
   */
  height?: number;
  /**
   * The mime type of the file.
   */
  mimeType: string;
  /**
   * The last modified timestamp of the file in milliseconds.
   *
   * @since 0.5.9
   */
  modifiedAt?: number;
  /**
   * The name of the file.
   */
  name: string;
  /**
   * The path of the file.
   *
   * Only available on Android and iOS.
   */
  path?: string;
  /**
   * The size of the file in bytes.
   */
  size: number;
  /**
   * The width of the image or video in pixels.
   *
   * Only available on Android and iOS.
   *
   * @since 0.5.3
   */
  width?: number;
}

/**
 * @since 0.5.3
 */
export interface PickMediaOptions {
  /**
   * Whether multiple files may be selected.
   *
   * @default false
   */
  multiple?: boolean;
  /**
   * Whether to read the file data.
   *
   * @default false
   */
  readData?: boolean;
}

/**
 * @since 0.5.3
 */
export type PickMediaResult = PickFilesResult;

/**
 * @since 0.5.3
 */
export type PickImagesOptions = PickMediaOptions;

/**
 * @since 0.5.3
 */
export type PickImagesResult = PickMediaResult;

/**
 * @since 0.5.3
 */
export type PickVideosOptions = PickMediaOptions;

/**
 * @since 0.5.3
 */
export type PickVideosResult = PickMediaResult;
