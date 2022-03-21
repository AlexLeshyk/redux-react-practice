import ErrorMessage from "../components/errorMessage/error";
import Spinner from "../components/spinner/spinner";

const setContentLists = (process: string, Component: any, itemsLoading: boolean) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return itemsLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw Error("Unexpected process state");
  }
};

export default setContentLists;
