import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "../store/slices";

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => {
      return bindActionCreators(actionCreators, dispatch);
    },
    // eslint-disable-next-line
    [dispatch]
  );
};
