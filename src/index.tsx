import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import "./styles/styles.scss";

import { fetchUsers } from "./store/slices/users";

import { worker } from "./api/server";

// Start our mock API server
worker.start({ onUnhandledRequest: "bypass" });

store.dispatch(fetchUsers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
