import React               from 'react';
import ReactDOM            from 'react-dom/client';
import {configureStore}    from "@reduxjs/toolkit"
import './index.css';
import App                 from './App';
import reportWebVitals     from './reportWebVitals';
import {Provider}          from "react-redux";
import blogReducer         from "./reducers/blogReducer";
import userReducer         from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import {HashRouter}        from "react-router-dom";
import commentReducer      from "./reducers/commentReducer";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    comments: commentReducer
  }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
