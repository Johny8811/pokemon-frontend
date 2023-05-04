import React from 'react';
import { render, screen } from '@testing-library/react';
import { PokemonList } from './PokemonList';

test('renders learn react link', () => {
  render(<PokemonList />);
  const linkElement = screen.getByText(/Pokemon/i);
  expect(linkElement).toBeInTheDocument();
});
