export interface OEmbed {
  info?: OEmbedInfo | null;
  url: string;
}

export interface OEmbedInfo {
  type: string;
  version: string;
  title?: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  provider_url?: string;
  cache_age?: number;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
}

export function isOEmbed(value: any): value is OEmbed {
  return typeof value === 'object' && typeof value.url === 'string';
}
