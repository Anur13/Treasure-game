import { createReducer } from '@reduxjs/toolkit';
import { IMove } from '../interfaces/IMove';
import { Actions } from '../enums/actions';
import { IScore } from '../interfaces/IResponse';

const movesReducer = createReducer(new Array<IMove>(), {
  [Actions.ADD_MOVE]: (store, { payload }) => [...store, payload],
  [Actions.REMOVE_MOVE]: (store, { payload }) =>
    store.filter(
      item =>
        item.rowPosition !== payload.rowPosition ||
        item.columnPosition !== payload.columnPosition,
    ),
  [Actions.RESET_MOVES]: () => [],
  [Actions.RESET]: () => [],
});

const nameReducer = createReducer('', {
  [Actions.SET_NAME]: (_, { payload }) => payload,
  [Actions.RESET]: () => '',
});

const turnsReducer = createReducer(0, {
  [Actions.TURN_INCREMENT]: store => store + 1,
  [Actions.RESET]: () => 0,
});

const gameStateReducer = createReducer(false, {
  [Actions.INVERT_GAME_STATE]: store => !store,
  [Actions.RESET]: () => false,
});

const checkedResultsReducer = createReducer(new Array<IMove>(), {
  [Actions.ADD_RESULTS]: (store, { payload }) => {
    const results = [...store];
    for (const move of payload) {
      const duplicate = store.find(
        item => JSON.stringify(item) === JSON.stringify(move),
      );
      if (duplicate) continue;
      results.push(move);
    }
    return results;
  },
  [Actions.RESET]: () => [],
});

const treasuresFoundReducer = createReducer(0, {
  [Actions.SET_TREASURES_FOUND]: (store, { payload }) => payload,
  [Actions.RESET]: () => 0,
});

const highScoreReducer = createReducer(new Array<IScore>(), {
  [Actions.SET_HIGHSCORES]: (store, { payload }) => payload,
});

export {
  turnsReducer,
  gameStateReducer,
  movesReducer,
  nameReducer,
  checkedResultsReducer,
  treasuresFoundReducer,
  highScoreReducer,
};
