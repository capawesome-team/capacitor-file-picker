export interface FilePickerPlugin {
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
  files: File[];
}

export interface File {
  /**
   * The path of the file.
   *
   * Only available on Android and iOS.
   */
  path?: string;
  /**
   * The name of the file.
   */
  name: string;
  /**
   * The Base64 string representation of the data contained in the file.
   *
   * Is only provided if `readData` is set to `true`.
   */
  data?: string;
  /**
   * The mime type of the file.
   */
  mimeType: string;
  /**
   * The size of the file in bytes.
   */
  size: number;
  /**
   * The Blob instance of the file.
   *
   * Only available on Web.
   */
  blob?: Blob;
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
export interface PickMediaResult {
  files: File[];
}

/**
 * @since 0.5.3
 */
export type PickImagesOptions = PickMediaOptions;

/**
 * @since 0.5.3
 */
export type PickVideosOptions = PickMediaOptions;

/**
 * @since 0.5.3
 */
export type PickImagesResult = PickMediaResult;

/**
 * @since 0.5.3
 */
export type PickVideosResult = PickMediaResult;
