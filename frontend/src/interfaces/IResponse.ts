import { IMove } from './IMove';

export interface IResponse {
  data: {
    foundTreasures: number;
    moves: IMove[];
    highScores: IScore[];
  };
}

export interface IScore {
  playerName: string;
  score: number;
}
