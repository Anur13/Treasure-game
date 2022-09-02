import { Injectable } from '@nestjs/common';
import { Games } from './interfaces/games';
import {
  CheckResultsDto,
  MovePosition,
  Position,
} from './interfaces/checkResultsDto';
import { Score } from './interfaces/score';
import { Response } from './interfaces/response';

const activeGames = {} as Games;
let highScores: Array<Score> = [];

@Injectable()
export class AppService {
  checkResults(results: CheckResultsDto, treasureLocations): Response {
    const { playerName, moves, turns } = results;
    let foundTreasures;

    if (playerName in activeGames) {
      foundTreasures = activeGames[playerName].foundTreasures +=
        this.validateMoves(moves, activeGames[playerName].treasureLocations);
    } else {
      foundTreasures = this.validateMoves(moves, treasureLocations);
      activeGames[playerName] = {
        foundTreasures,
        treasureLocations,
      };
    }
    let result = { moves, foundTreasures } as Response;

    if (foundTreasures === 3) {
      delete activeGames[playerName];
      const duplicate = highScores.find(
        (item) => item.playerName === playerName,
      );

      if (duplicate) {
        if (turns < duplicate.score) {
          duplicate.score = turns;
        }
      } else {
        highScores.push({ playerName, score: turns });
      }
      highScores = highScores.sort((a, b) => a.score - b.score);
      if (highScores.length === 11) highScores.length = 10;
      result = { ...result, highScores };
    }

    return result;
  }

  generateResponse(results: CheckResultsDto) {
    const treasureLocations = this.generateTreasures();
    return this.checkResults(results, treasureLocations);
  }

  validateMoves(moves: MovePosition[], treasureLocations) {
    let foundTreasures = 0;
    for (const move of moves) {
      const minToTreasureRow = 5;
      const minToTreasureColumn = 5;
      let total = minToTreasureRow + minToTreasureColumn;

      for (const treasure of treasureLocations) {
        const columnDifference = Math.abs(
          move.columnPosition - treasure.columnPosition,
        );

        const rowDifference = Math.abs(move.rowPosition - treasure.rowPosition);

        const sum = columnDifference + rowDifference;
        if (sum < total) total = sum;
      }

      switch (total) {
        case 0:
          move.result = 'T';
          move.isTreasure = true;
          ++foundTreasures;
          break;
        case 1:
          move.result = 3;
          move.isTreasure = false;
          break;
        case 2:
          move.result = 2;
          move.isTreasure = false;
          break;
        default:
          move.result = 1;
          move.isTreasure = false;
      }
    }
    return foundTreasures;
  }

  generateTreasures() {
    const treasures: Position[] = [];
    for (let i = 1; i <= 3; i++) {
      let treasure: Position = this.generateTreasure();
      while (treasures.length < i) {
        const duplicate = treasures.find(
          (item) =>
            item.rowPosition === treasure.rowPosition &&
            item.columnPosition === treasure.columnPosition,
        );
        if (!duplicate) {
          treasures.push(treasure);
        } else {
          treasure = this.generateTreasure();
        }
      }
    }

    return treasures;
  }

  private generateTreasure() {
    const treasure = {} as Position;
    treasure.rowPosition = this.getRandomInt(1, 5);
    treasure.columnPosition = this.getRandomInt(1, 5);
    return treasure;
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
