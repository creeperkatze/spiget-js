/** An icon or avatar image, either as a relative URL or inline base64 data. */
export interface Icon {
  /** Relative URL to the image. */
  url: string;
  /** Base64-encoded image data. */
  data?: string;
}

/** A reference to another object by id. */
export interface IdReference {
  /** ID of the other object. */
  id: number;
}

/** A reference to another object by id and UUID. */
export interface IdAndUUIDReference {
  /** ID of the other object. */
  id: number;
  /** UUID of the other object. */
  uuid: string;
}
