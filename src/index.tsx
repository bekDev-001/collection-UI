import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import {store} from "./redux/store"
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'tw-elements';
import 'react-toastify/dist/ReactToastify.css';
import './i18n.js';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense fallback={<div>Loading..</div>}>
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
  </Suspense>
);
