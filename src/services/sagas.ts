import { all } from 'redux-saga/effects';

// import sagas

/**
 * Fetch all sagas with using yield all and fork of redux-saga effects.
 */
function* rootSagas() {
  yield all([]);
}

export default rootSagas;
