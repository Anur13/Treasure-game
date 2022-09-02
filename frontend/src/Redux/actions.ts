import { createAction } from '@reduxjs/toolkit';
import { Actions } from '../enums/actions';
import { IMove } from '../interfaces/IMove';
import { IScore } from '../interfaces/IResponse';

const incrementMoves = createAction(Actions.INCREMENT_MOVE);
const decrementMoves = createAction(Actions.DECREMENT_MOVE);
const resetMoves = createAction(Actions.RESET_MOVES);

const addMoves = createAction<IMove>(Actions.ADD_MOVE);
const removeMoves = createAction<IMove>(Actions.REMOVE_MOVE);

const incrementTurn = createAction(Actions.TURN_INCREMENT);

const invertGameState = createAction(Actions.INVERT_GAME_STATE);

const setStoreName = createAction<string>(Actions.SET_NAME);

const addResults = createAction<IMove[]>(Actions.ADD_RESULTS);

const setTreasuresFound = createAction<number>(Actions.SET_TREASURES_FOUND);

const setHighScores = createAction<IScore[]>(Actions.SET_HIGHSCORES);

const reset = createAction(Actions.RESET);

export {
  incrementMoves,
  decrementMoves,
  resetMoves,
  incrementTurn,
  invertGameState,
  addMoves,
  removeMoves,
  setStoreName,
  addResults,
  setTreasuresFound,
  reset,
  setHighScores,
};
