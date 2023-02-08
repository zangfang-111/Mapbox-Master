import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Home from 'components/home';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
    </Route>
  )
);
