import { IMove } from './IMove';

export interface BoardTileProps {
  position: IMove;
  result?: string | number;
}
