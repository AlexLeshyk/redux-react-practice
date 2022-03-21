import useFetching from "../hooks/useFetching";
import { IChar, IComic } from "../types/marvel";

const MarvelService = () => {
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=f30835d41b363dd05fa9e51a0d6bd1a4";
  const _baseOffset = 210;

  const { request, process, setProcess, clearError } = useFetching();

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacterByName = async (name: string) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id: number) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id: number) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = (char: IChar) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 200)}...`
        : "There is no description for this character",
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics: IComic) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      language: comics.textObjects.language || "en-us",
      price: comics.prices.price ? `${comics.prices.price}$` : "not available",
    };
  };

  return {
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComic,
    getCharacterByName,
  };
};

export default MarvelService;
