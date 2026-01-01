// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//     <ToastContainer position="top-right" autoClose={3000} theme="colored" />
//   </Provider>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </PersistGate>
  </Provider>
);
