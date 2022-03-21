import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarvelService from "../../services/marvelService";
import setContent from "../../utils/setContent";

interface SinglePageProps {
  Component: any;
  dataType: string;
}

const SinglePage: FC<SinglePageProps> = ({ Component, dataType }) => {
  const [data, setData] = useState(null);

  const { id } = useParams();
  const { getComic, getCharacter, clearError, process, setProcess } = MarvelService();

  const updateData = () => {
    clearError();
    switch (dataType) {
      case "comic":
        getComic(Number(id))
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;
      case "character":
        getCharacter(Number(id))
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
    }
  };

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [id]);

  const onDataLoaded = (data: any) => {
    setData(data);
  };

  return <>{setContent(process, data, Component)}</>;
};

export default SinglePage;
