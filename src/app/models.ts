export interface Game {
  id: number;
  background_image: string;
  name: string;
  released: string;
  metacritic_url: string;
  website: string;
  description: string;
  metacritic: number;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publishers>;
  ratings: Array<Rating>;
  screenshots: Array<Screenshot>;
  trailers: Array<Trailer>;
}

export interface APIResponse<T> {
  results: Array<T>;

  count: number;
  next: string | null;
  previous: string | null;
}

export interface Genre {
  name: string;
}

export interface ParentPlatform {
  platform: {
    name: string;
  };
}

export interface Publishers {
  name: string;
}

export interface Rating {
  id: number;
  count: number;
  title: string;
}

export interface Screenshot {
  image: string;
}

export interface Trailer {
  data: {
    max: string;
  };
}
