import { IStore } from '../interfaces/IStore';

export default {
  getMovesPerTurn: (state: IStore) => state.moves,
  getTotalTurns: (state: IStore) => state.turns,
  getGameState: (state: IStore) => state.isGameStarted,
  getName: (state: IStore) => state.name,
  getCheckedResults: (state: IStore) => state.checkedResults,
  getTreasuresFound: (state: IStore) => state.treasuresFound,
  getHighScores: (state: IStore) => state.highScores,
};
