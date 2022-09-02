import { AppDispatch, RootState } from './store';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import Selectors from '../Redux/selectors';
import { addResults, setHighScores, setTreasuresFound } from './actions';
import { IResponse } from '../interfaces/IResponse';

axios.defaults.baseURL = 'http://localhost:8080';

const submitTurn =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const moves = Selectors.getMovesPerTurn(getState());
    const playerName = Selectors.getName(getState());
    const turns = Selectors.getTotalTurns(getState());

    try {
      const { data } = (await axios.post('', {
        playerName,
        moves,
        turns,
      })) as IResponse;
      dispatch(addResults(data.moves));
      dispatch(setTreasuresFound(data.foundTreasures));
      if (data.highScores) dispatch(setHighScores(data.highScores));
    } catch (error) {
      console.log(error);
    }
  };

export { submitTurn };
