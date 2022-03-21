import { FC, useEffect, useState } from "react";
import MarvelService from "../../services/marvelService";
import { ComicsListState } from "../../types/marvel";
import { Link } from "react-router-dom";
import setContentLists from "../../utils/setContentLists";

import "./comicsList.scss";

const ComicsList: FC = () => {
  const { getAllComics, process, setProcess } = MarvelService();
  const [comics, setComics] = useState<ComicsListState[]>([]);
  const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(210);
  const [comicsEnded, setComicsEnded] = useState<boolean>(false);

  const onComicsListLoaded = (newComicsList: ComicsListState[]) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComics((comics) => [...comics, ...newComicsList]);
    setNewItemsLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);
  };

  const onRequest = (offset: number, initial: boolean) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllComics(offset)
      .then(onComicsListLoaded)
      .then(() => setProcess("confirmed"));
  };

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const renderItems = (arr: ComicsListState[]) => {
    const items = arr.map((item: ComicsListState, i: number) => {
      return (
        <li className="comics__item" key={item.id}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  };

  return (
    <div className="comics__list">
      {setContentLists(process, () => renderItems(comics), newItemsLoading)}
      <button
        disabled={newItemsLoading}
        className="button button__main button__long"
        onClick={() => onRequest(offset, false)}
        style={{ display: comicsEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
