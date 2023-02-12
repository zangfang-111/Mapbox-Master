import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import Home from 'components/home';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(),
}));

// @ts-ignore
mapboxgl.Map.prototype = {
  remove: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
};

beforeEach(() => {
  jest.useFakeTimers();
  cleanup();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('test home page', () => {
  it('should render page without crash', async () => {
    act(() => jest.advanceTimersByTime(1000));
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const field = await waitFor(() => screen.getByTestId('map-container'));
    expect(field).toBeInTheDocument();
  });

  // TODO:
  // other all functionalities test here
});
