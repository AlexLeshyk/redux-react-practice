import { FC } from "react";
import { RandomCharState } from "../../../types/marvel";
import "./singleCharacterLayout.scss";

interface SingleCharacterLayoutProps {
  data: RandomCharState;
}
const SingleCharacterLayout: FC<SingleCharacterLayoutProps> = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharacterLayout;
