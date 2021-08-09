import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoList from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './state/reducers'

const store = createStore(rootReducer)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <TodoList />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
