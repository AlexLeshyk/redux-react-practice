import * as UserActionCreators from "./user";
import * as TodoActionCreators from "./todo";
import * as CounterActionCreators from "./counter";

const actionCreators = {
  ...TodoActionCreators,
  ...UserActionCreators,
  ...CounterActionCreators,
};

export default actionCreators;
