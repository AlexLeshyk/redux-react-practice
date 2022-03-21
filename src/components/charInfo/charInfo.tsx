import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RandomCharState } from "../../types/marvel";
import MarvelService from "../../services/marvelService";
import setContent from "../../utils/setContent";

import "./charInfo.scss";

interface CharInfoProps {
  charId: number | null;
}

const CharInfo: FC<CharInfoProps> = ({ charId }) => {
  const [char, setChar] = useState<RandomCharState>({
    name: "",
    description: "",
    thumbnail: "",
    homepage: "",
    wiki: "",
    id: null,
    comics: [],
  });

  const { getCharacter, clearError, process, setProcess } = MarvelService();

  const mounted = useRef<boolean>(false);
  const updateChar = (charId: null | number) => {
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  useEffect(() => {
    if (!mounted.current) {
      updateChar(charId);
      mounted.current = true;
    } else {
      updateChar(charId);
    }
    // eslint-disable-next-line
  }, [charId]);

  const onCharLoaded = (char: RandomCharState) => {
    setChar(char);
  };

  return <div className="char__info">{setContent(process, char, View)}</div>;
};

interface ViewProps {
  data: RandomCharState;
}

const View: FC<ViewProps> = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={thumbnail.includes("image_not_available") ? { objectFit: "contain" } : {}}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length ? null : "There is no info here"}
        {comics &&
          comics.map((item, i) => {
            if (i > 9) {
              return null;
            }
            let comicArray = item.resourceURI.split("/");
            let comicId = comicArray[comicArray.length - 1];
            return (
              <li key={i} className="char__comics-item">
                <Link to={`/comics/${comicId}`}>{item.name}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default CharInfo;
