import { FC, useEffect, useMemo, useRef, useState } from "react";
import MarvelService from "../../services/marvelService";
import { RandomCharState } from "../../types/marvel";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import setContentLists from "../../utils/setContentLists";

import "./charList.scss";

interface CharListProps {
  onCharSelected: (value: number | null) => void;
}

const CharList: FC<CharListProps> = ({ onCharSelected }) => {
  const { getAllCharacters, process, setProcess } = MarvelService();
  const [chars, setChars] = useState<RandomCharState[]>([]);
  const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(210);
  const [charEnded, setCharEnded] = useState<boolean>(false);

  const itemRefs = useRef<HTMLLIElement[]>([]);

  const onCharListLoaded = (newCharList: RandomCharState[]) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setChars((chars) => [...chars, ...newCharList]);
    setNewItemsLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => {
      return ended;
    });
  };

  const onRequest = (offset: number, initial: boolean) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const addActiveClass = (id: number) => {
    itemRefs.current.map((item) => item.classList.remove("char__item_selected"));
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  useEffect(() => {
    // let isMounted = true;

    // const updateChars = () => {
    //   getAllCharacters().then((data) => {
    //     if (isMounted) {
    //       onCharListLoaded(data);
    //     }
    //   });
    // };

    // updateChars();

    // return () => {
    //   isMounted = false;
    // };
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const renderItems = (arr: RandomCharState[]) => {
    const items = arr.map((item: RandomCharState, i: number) => {
      return (
        <CSSTransition key={item.id} timeout={500} classNames="char__item">
          <li
            className="char__item"
            key={item.name}
            tabIndex={0}
            onClick={() => {
              onCharSelected(item.id);
              addActiveClass(i);
            }}
            onKeyPress={(e: React.KeyboardEvent<HTMLLIElement>) => {
              if (e.key === "Enter") {
                onCharSelected(item.id);
                addActiveClass(i);
              }
            }}
            ref={(el: HTMLLIElement) => (itemRefs.current[i] = el)}
          >
            <img
              src={item.thumbnail}
              alt={item.name}
              style={item.thumbnail.includes("image_not_available") ? { objectFit: "contain" } : {}}
            />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  };

  const elements = useMemo(
    () => setContentLists(process, () => renderItems(chars), newItemsLoading),
    // eslint-disable-next-line
    [process]
  );

  return (
    <div className="char__list">
      {elements}
      <button
        disabled={newItemsLoading}
        className="button button__main button__long"
        onClick={() => onRequest(offset, false)}
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
