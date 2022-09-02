import { MovePosition } from './checkResultsDto';

export interface Games {
  [key: string]: GameData;
}

interface GameData {
  treasureLocations: MovePosition[];
  foundTreasures: number;
}
