import { CounterActionTypes, CunterAction } from "../../types/simple";

const initialState = { value: 0, num: 1 };

export const simpleReducer = (state = initialState, action: CunterAction) => {
  switch (action.type) {
    case CounterActionTypes.INC:
      return {
        ...state,
        value: state.value + 1,
      };
    case CounterActionTypes.DEC:
      return {
        ...state,
        value: state.value - 1,
      };
    case CounterActionTypes.RDN:
      return {
        ...state,
        num: state.num * action.payload,
      };
    default:
      return state;
  }
};
