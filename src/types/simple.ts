export interface ISimpleCounter {
  value: number;
}

export enum CounterActionTypes {
  DEC = "DEC",
  INC = "INC",
  RDN = "RDN",
}

interface IncrementAction {
  type: CounterActionTypes.INC;
  payload: number;
}

interface DecrememntAction {
  type: CounterActionTypes.DEC;
  payload: number;
}

interface RandomAction {
  type: CounterActionTypes.RDN;
  payload: number;
}

export type CunterAction = IncrementAction | DecrememntAction | RandomAction;
