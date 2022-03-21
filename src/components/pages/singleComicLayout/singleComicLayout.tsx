import { FC } from "react";
import { Link } from "react-router-dom";
import { ComicsListState } from "../../../types/marvel";
import "./singleComicLayout.scss";

interface SingleComicLayoutProps {
  data: ComicsListState;
}
const SingleComicLayout: FC<SingleComicLayoutProps> = ({ data }) => {
  const { title, thumbnail, description, pageCount, price, language } = data;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt="title" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicLayout;
