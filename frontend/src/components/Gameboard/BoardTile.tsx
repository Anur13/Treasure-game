import React, { SyntheticEvent, useEffect, useState } from 'react';
import { BoardTileProps } from '../../interfaces/BoardTileProps';
import styles from './Game.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Selectors from '../../Redux/selectors';
import { IStore } from '../../interfaces/IStore';
import {
  incrementMoves,
  decrementMoves,
  addMoves,
  removeMoves,
} from '../../Redux/actions';

export const BoardTile = ({ position, result }: BoardTileProps) => {
  const [marked, setMarked] = useState(false);
  const dispatch = useDispatch();
  const moves = useSelector((state: IStore) =>
    Selectors.getMovesPerTurn(state),
  );

  useEffect(() => {
    if (moves.length === 0) {
      setMarked(false);
    }
  }, [moves]);

  function makeMove(e: SyntheticEvent) {
    e.preventDefault();
    if (result) return;
    if (moves.length <= 2 && !marked) {
      dispatch(addMoves(position));

      setMarked(!marked);
    }
    if (marked) {
      dispatch(removeMoves(position));
      setMarked(!marked);
    }
  }

  function getTileStyles(result: string | number | undefined) {
    let style = `${styles.tile} `;
    if (result && typeof result === 'string') {
      style += styles[`${result}ResType`];
    }
    if (result && typeof result === 'number') {
      switch (result) {
        case 3:
          style += styles[`closeResType`];
          break;

        case 2:
          style += styles[`midResType`];
          break;

        case 1:
          style += styles[`farResType`];
          break;

        default:
          style += styles[`farResType`];
          break;
      }
    }
    return style;
  }

  return (
    <div
      className={getTileStyles(result)}
      // className={`${styles.tile} ${styles[`${result}ResType`]}`}
      onClick={makeMove}
    >
      {marked && <div className={styles.mark}>X</div>}
      {result && <div className={styles.mark}>{result}</div>}
    </div>
  );
};
