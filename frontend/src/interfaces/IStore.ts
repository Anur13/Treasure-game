import { IMove } from './IMove';
import { IScore } from './IResponse';

export interface IStore {
  name: string;
  moves: IMove[];
  turns: number;
  isGameStarted: boolean;
  checkedResults: IMove[];
  treasuresFound: number;
  highScores: IScore[];
}
