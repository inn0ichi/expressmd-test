import './App.css';

import Router from './router/index.js';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Logo from './assets/icon-512x512.png';
import React, { Suspense, useEffect } from 'react';
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const Loader = () => (
  <div className="App">
    <MoonLoader color={"blue"} css={override} size={64} />
  </div>
);

function App() {
  if (!localStorage.getItem("locale")) {
    localStorage.setItem("locale", "en");
  }
  return (
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <Router />
      </Provider>
    </Suspense>

  );
}

export default App;