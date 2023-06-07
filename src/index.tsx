import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import './index.css';
import { PokemonList } from './modules/pokemonList/PokemonList';
import { PokemonDetail } from './modules/pokemonDetail/PokemonDetail';
import { NoMatchingRoute } from './uiComponents/noMatchRoute/NoMatchRoute';
import reportWebVitals from './reportWebVitals';

import { client } from './apollo/client'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetail />} />
          <Route path="*" element={<NoMatchingRoute />} />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
