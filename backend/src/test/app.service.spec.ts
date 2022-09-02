import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { AppController } from '../app.controller';
import { stubs } from './stubs';

describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('If two moves align with treasures should return appropriate result', () => {
      const treasures = stubs.treasures;
      const results = {
        playerName: 'test',
        turns: 2,
        moves: [
          { rowPosition: 1, columnPosition: 1 },
          { rowPosition: 4, columnPosition: 4 },
          { rowPosition: 2, columnPosition: 3 },
        ],
      };
      const checkedResults = appService.checkResults(results, treasures);
      expect(checkedResults.foundTreasures).toEqual(2);
      expect(checkedResults.moves[0].result).toEqual('T');
      expect(checkedResults.moves[0].isTreasure).toEqual(true);

      expect(checkedResults.moves[1].result).toEqual('T');
      expect(checkedResults.moves[1].isTreasure).toEqual(true);

      expect(checkedResults.moves[2].result).toEqual(3);
      expect(checkedResults.moves[2].isTreasure).toEqual(false);
    });

    it('If 0 moves align should return appropriate result', () => {
      const treasures = stubs.treasures;
      const results = {
        playerName: 'test',
        turns: 2,
        moves: [
          { rowPosition: 1, columnPosition: 2 },
          { rowPosition: 4, columnPosition: 3 },
          { rowPosition: 2, columnPosition: 3 },
        ],
      };
      const checkedResults = appService.checkResults(results, treasures);
      const areResultsCorrect = checkedResults.moves.some(
        (item) => !item.isTreasure && item.result !== 'T',
      );
      expect(areResultsCorrect).toEqual(true);
      expect(checkedResults.foundTreasures).toEqual(0);
    });

    it('If treasures found im several turns expect correct result', () => {
      const treasures = stubs.treasures;
      const results = {
        playerName: 'test',
        turns: 2,
        moves: [
          { rowPosition: 1, columnPosition: 1 },
          { rowPosition: 4, columnPosition: 3 },
          { rowPosition: 2, columnPosition: 3 },
        ],
      };

      appService.checkResults(results, treasures);

      results.moves = [
        { rowPosition: 1, columnPosition: 4 },
        { rowPosition: 4, columnPosition: 4 },
        { rowPosition: 2, columnPosition: 5 },
      ];

      appService.checkResults(results, treasures);

      results.moves = [
        { rowPosition: 3, columnPosition: 3 },
        { rowPosition: 2, columnPosition: 2 },
        { rowPosition: 1, columnPosition: 3 },
      ];

      const checkedResults = appService.checkResults(results, treasures);
      console.log(checkedResults);
      expect(checkedResults.foundTreasures).toEqual(3);
      expect(checkedResults).toHaveProperty('highScores');
      const [score] = checkedResults.highScores;

      expect(score.score).toEqual(2);
      expect(score.playerName).toEqual('test');
    });

    it('It should rewrite score for user if new score is lower', () => {
      const treasures = stubs.treasures;
      let results = {
        playerName: 'test',
        turns: 4,
        moves: [
          { rowPosition: 1, columnPosition: 1 },
          { rowPosition: 4, columnPosition: 4 },
          { rowPosition: 1, columnPosition: 3 },
        ],
      };
      let checkedResults = appService.checkResults(results, treasures);
      expect(checkedResults.highScores[0].score).toEqual(results.turns);

      results = {
        playerName: 'test',
        turns: 2,
        moves: [
          { rowPosition: 1, columnPosition: 1 },
          { rowPosition: 4, columnPosition: 4 },
          { rowPosition: 1, columnPosition: 3 },
        ],
      };
      checkedResults = appService.checkResults(results, treasures);

      expect(checkedResults.highScores[0].score).toEqual(results.turns);
    });

    it('It should return ten highest scores', () => {
      const treasures = stubs.treasures;
      let checkedResults;
      for (let i = 0; i <= 15; i++) {
        const results = {
          playerName: 'name' + i,
          turns: i,
          moves: [
            { rowPosition: 1, columnPosition: 1 },
            { rowPosition: 4, columnPosition: 4 },
            { rowPosition: 1, columnPosition: 3 },
          ],
        };
        checkedResults = appService.checkResults(results, treasures);
      }

      expect(checkedResults.highScores.length).toEqual(10);
      expect(checkedResults.highScores[0].score).toEqual(0);
      expect(checkedResults.highScores[9].score).toEqual(9);
    });
  });
});
