import type { Icon, IdAndUUIDReference, IdReference } from './common.js';
import type { ListOptions } from './base.js';

/** A downloadable file belonging to a resource. */
export interface ResourceFile {
  /** File extension (`.jar`, `.zip`, `.sk`, ...) or `"external"`. */
  type: string;
  /** File size. */
  size: number;
  /** File size unit (`KB`, `MB`, `GB`). */
  sizeUnit: string;
  /** Relative URL to the file. */
  url: string;
  /** URL of external downloads. */
  externalUrl?: string;
}

/** Aggregate rating of a resource or resource version. */
export interface ResourceRating {
  /** Number of ratings. */
  count: number;
  /** Average rating. */
  average: number;
}

/** A resource (plugin) on SpigotMC, as indexed by Spiget. */
export interface Resource {
  /** Id of the resource. */
  id: number;
  /** Name of the resource. */
  name: string;
  /** Tag line of the resource. */
  tag: string;
  /** Contributors of the resource. */
  contributors: string;
  /** Number of likes. */
  likes: number;
  /** The resource's primary file. */
  file: ResourceFile;
  /** List of tested Minecraft versions of the resource. */
  testedVersions: string[];
  /** Map of external and custom links in the resource description. */
  links: Record<string, string>;
  /** The resource's rating. */
  rating: ResourceRating;
  /** Release timestamp. */
  releaseDate: number;
  /** Update timestamp. */
  updateDate: number;
  /** Amount of downloads. */
  downloads: number;
  /** Whether this resource is external (not hosted on SpigotMC.org). */
  external: boolean;
  /** The resource's icon. */
  icon: Icon;
  /** Whether the resource is a premium resource. */
  premium: boolean;
  /** Price of the resource (only if the resource is premium). */
  price?: number;
  /** Price currency of the resource (only if the resource is premium). */
  currency?: string;
  /** Reference to the resource's author. */
  author: IdReference;
  /** Reference to the resource's category. */
  category: IdReference;
  /** Reference to the resource's current version. */
  version: IdAndUUIDReference;
  /** List of review ids on this resource. Only present when directly requesting the resource. */
  reviews?: IdReference[];
  /** List of version ids of this resource. Only present when directly requesting the resource. */
  versions?: IdReference[];
  /** List of update ids of this resource. Only present when directly requesting the resource. */
  updates?: IdReference[];
  /** Source code link of the resource. */
  sourceCodeLink?: string;
  /** Donation link of the resource. */
  donationLink?: string;
}

/** Query parameters for {@link ResourcesApi.list}, {@link ResourcesApi.listFree}, {@link ResourcesApi.listNew}, and {@link ResourcesApi.listPremium}. */
export type GetResourcesOptions = ListOptions;

/** Method used to check whether a resource matches the requested version(s). */
export type ResourceVersionMatchMethod = 'any' | 'all';

/** Query parameters for {@link ResourcesApi.listForVersions}. */
export interface GetResourcesForVersionsOptions extends ListOptions {
  /** Method to use to check for versions. */
  method?: ResourceVersionMatchMethod;
}

/** Query parameters for {@link ResourcesApi.search}. */
export interface SearchResourcesOptions extends ListOptions {
  /** Field to search in. */
  field?: 'name' | 'tag';
}
