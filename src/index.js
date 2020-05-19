/*
 Copyright (C) 2020  Arda Örkin

 This file is part of Earthify.

 Earthify is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Earthify is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Earthify.  If not, see <https://www.gnu.org/licenses/>.

 ardaorkin3@gmail.com
 https://twitter.com/OrkinArda
 https://github.com/ardaorkin
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import Intro from './components/Intro'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {localStorage.getItem("logged_in") == undefined ? <Intro /> : <App />}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
