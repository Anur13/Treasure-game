import { MovePosition } from './checkResultsDto';
import { Score } from './score';

export interface Response {
  highScores?: Score[];
  moves: MovePosition[];
  foundTreasures: number;
}
