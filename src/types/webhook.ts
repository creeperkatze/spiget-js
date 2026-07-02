/** Result of registering a new webhook. */
export interface WebhookRegistration {
  /** ID of the registered webhook. */
  id: string;
  /** Registration secret. */
  secret: string;
}

/** Status of a registered webhook. */
export interface WebhookStatus {
  /** Status id. */
  status: number;
  /** Amount of failed connections. */
  failedConnections: number;
}
