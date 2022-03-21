export interface IChar {
  name: string;
  description: string;
  thumbnail: IThumbnail;
  urls: [{ url: string }, { url: string }];
  id: number;
  comics: {
    items: IComicsItems[];
  };
}

export interface IComic {
  id: number;
  title: string;
  description: string;
  pageCount: string;
  thumbnail: IThumbnail;
  prices: {
    price: IComicsPrice[];
  };
  textObjects: {
    language: string;
  };
}

export interface RandomCharState {
  name: string;
  description: string;
  thumbnail: string;
  homepage: string;
  wiki: string;
  id: number | null;
  comics: IComicsItems[];
}

export interface ComicsListState {
  id: number | null;
  title: string;
  description: string;
  pageCount: string;
  thumbnail: string;
  price: string;
  language: string;
}

export interface IComicsItems {
  resourceURI: string;
  name: string;
}

export interface IThumbnail {
  path: string;
  extension: string;
}

export interface IComicsPrice {
  type: string;
  price: number;
}
