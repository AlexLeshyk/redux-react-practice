import { CounterActionTypes } from "../../types/simple";

export const incrementCounter = () => {
  return {
    type: CounterActionTypes.INC,
  };
};

export const decrementCounter = () => {
  return {
    type: CounterActionTypes.DEC,
  };
};

export const rdnCounter = () => {
  return {
    type: CounterActionTypes.RDN,
    payload: Math.floor(Math.random() * 10),
  };
};
