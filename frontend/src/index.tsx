import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./routes/App";
import reportWebVitals from "./reportWebVitals";
import "react-day-picker/dist/style.css";

import { Provider } from "react-redux";
import store from "./store";
process.env.NODE_PATH = "src";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
