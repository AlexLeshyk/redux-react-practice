import * as UserActionCreators from "./users";
import * as TodoActionCreators from "./todo";
import * as CounterActionCreators from "./counter";

const actionCreators = {
  ...TodoActionCreators,
  ...UserActionCreators,
  ...CounterActionCreators,
};

export default actionCreators;
