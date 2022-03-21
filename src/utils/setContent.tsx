import ErrorMessage from "../components/errorMessage/error";
import Skeleton from "../components/skeleton/skeleton";
import Spinner from "../components/spinner/spinner";

const setContent = (process: string, data: any, Component: any) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Spinner />;
    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      throw Error("Unexpected process state");
  }
};

export default setContent;
