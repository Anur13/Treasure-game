import React, { SyntheticEvent, useEffect, useState } from 'react';
import { BoardTile } from './BoardTile';
import styles from './Game.module.scss';
import { useSelector } from 'react-redux';
import { IStore } from '../../interfaces/IStore';
import Selectors from '../../Redux/selectors';
import {
  resetMoves,
  incrementTurn,
  invertGameState,
  reset,
} from '../../Redux/actions';
import { submitTurn } from '../../Redux/operations';
import { useAppDispatch } from '../../common/hooks';
import { setStoreName } from '../../Redux/actions';
import { IMove } from '../../interfaces/IMove';

export const GameBoard = () => {
  const [board, setBoard] = useState<IMove[]>([]);
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const turns = useSelector((state: IStore) => Selectors.getTotalTurns(state));
  const treasuresFound = useSelector((state: IStore) =>
    Selectors.getTreasuresFound(state),
  );

  const checkedResults = useSelector((state: IStore) =>
    Selectors.getCheckedResults(state),
  );

  const isGameStarted = useSelector((state: IStore) =>
    Selectors.getGameState(state),
  );

  const highscores = useSelector((state: IStore) =>
    Selectors.getHighScores(state),
  );

  function startGame(e: SyntheticEvent) {
    e.preventDefault();
    dispatch(invertGameState());
    dispatch(setStoreName(name));
  }

  useEffect(() => {
    let newBoard = [];
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 5; j++) {
        newBoard.push({ rowPosition: i, columnPosition: j });
      }
    }

    if (checkedResults.length !== 0) {
      newBoard = newBoard.map(item => {
        let result = item;
        for (const res of checkedResults) {
          if (
            res.columnPosition === item.columnPosition &&
            res.rowPosition === item.rowPosition
          ) {
            result = res;
          }
        }
        return result;
      });
    }
    setBoard([...newBoard]);
  }, [checkedResults]);

  async function endTurn() {
    dispatch(incrementTurn());
    await dispatch(submitTurn());
    dispatch(resetMoves());
  }

  function getName(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setName(e.currentTarget.value);
  }

  function resetGame() {
    dispatch(reset());
  }

  return (
    <>
      {isGameStarted ? (
        <div>
          <p>Your score: {turns}</p>
          <div className={styles.board}>
            {board.map((position, i) => (
              <BoardTile key={i} position={position} result={position.result} />
            ))}
          </div>
          {treasuresFound !== 3 && (
            <button onClick={endTurn} className={styles.endTurnButton}>
              End turn
            </button>
          )}

          {treasuresFound === 3 && (
            <button onClick={resetGame}>Start Again?</button>
          )}

          {treasuresFound === 3 && highscores?.length !== 0 && (
            <table>
              <thead>Highscores</thead>
              <tbody>
                {highscores?.map((score, i) => (
                  <tr key={i}>
                    <td>{score.playerName}</td>
                    <td>{score.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div>
          <form>
            <label>
              <input onChange={getName} />
              Name
            </label>
            <button onClick={startGame}>Start game</button>
          </form>
        </div>
      )}
    </>
  );
};
