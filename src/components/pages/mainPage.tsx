import { useState } from "react";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";
import CharInfo from "../charInfo/charInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import CharSearchForm from "../charSearchForm/charSearchForm";
import HocComponent from "../hocComponent/hocComponent";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState<number | null>(null);
  const onCharSelected = (id: number | null) => {
    setSelectedChar(id);
  };

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      {/* <HocComponent /> */}
    </>
  );
};

export default MainPage;
