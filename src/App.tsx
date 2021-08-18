import React from 'react';
import style from './App.module.scss';
import { testFnc } from '@assets/lib/test';
import { Provider } from 'react-redux';
import store from './config/store';
import Header from '@components/Header';

function App() {
  testFnc();

  return (
    <Provider store={store}>
      <div className={style.App}>
        <div className={style.title}>hi</div>
        <Header />
      </div>
    </Provider>
  );
}

export default App;
