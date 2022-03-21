import { FC, useEffect, useState } from "react";
import MarvelService from "../../services/marvelService";
import { RandomCharState } from "../../types/marvel";
import setContent from "../../utils/setContent";
import "./randomChar.scss";
const mjolnir = require("../../resources/img/mjolnir.png");

const RandomChar: FC = () => {
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

  const onCharLoaded = (char: RandomCharState) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
      .then((data) => {
        onCharLoaded(data);
      })
      .then(() => setProcess("confirmed"));
  };

  useEffect(() => {
    let isMounted = true;

    const updateChar = () => {
      clearError();
      const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
      getCharacter(id)
        .then((data) => {
          if (isMounted) {
            onCharLoaded(data);
          }
        })
        .then(() => setProcess("confirmed"));
    };

    updateChar();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="randomchar">
      {setContent(process, char, View)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img alt="mjolnir" src={mjolnir} className="randomchar__decoration" />
      </div>
    </div>
  );
};

interface ViewProps {
  data: RandomCharState;
}
const View: FC<ViewProps> = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki } = data;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={thumbnail.includes("image_not_available") ? { objectFit: "contain" } : {}}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
