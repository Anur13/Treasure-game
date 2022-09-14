package com.example.springboot.service;

import com.example.springboot.entity.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class TreasureService {
    private final Map<String, GameData> ACTIVE_GAMES = new ConcurrentHashMap<>();
    private final Map<String, Score> HIGH_SCORES = new ConcurrentHashMap<>();

    private TreasureResponseDto checkResults(TreasureRequestDto results, List<Position> treasureLocations) {
        int foundTreasures = 0;
        String playerName = results.getPlayerName();
        if (ACTIVE_GAMES.containsKey(playerName)) {
            GameData activeGame = ACTIVE_GAMES.get(playerName);

            int sum = activeGame.getFoundTreasures() +
                    validateMoves(results.getMoves(), activeGame.getTreasureLocations());

            activeGame.setFoundTreasures(sum);
            foundTreasures = sum;

        } else {
            foundTreasures = validateMoves(results.getMoves(), treasureLocations);
            GameData game = GameData.builder()
                    .foundTreasures(foundTreasures)
                    .treasureLocations(treasureLocations)
                    .build();
            ACTIVE_GAMES.put(playerName, game);
        }

        TreasureResponseDto response = TreasureResponseDto.builder()
                .foundTreasures(foundTreasures)
                .moves(results.getMoves())
                .build();

        Score score = Score.builder()
                .score(results.getTurns())
                .playerName(playerName)
                .build();

        if (foundTreasures == 3) {
            ACTIVE_GAMES.remove(playerName);
            if (HIGH_SCORES.containsKey(playerName)) {
                if (results.getTurns() < HIGH_SCORES.get(playerName).getScore()) {
                    HIGH_SCORES.put(playerName, score);
                }
            } else {
                HIGH_SCORES.put(playerName, score);
            }
            response.setHighScores(HIGH_SCORES.values().stream()
                    .sorted(Comparator.comparing(Score::getScore))
                    .collect(Collectors.toList()));
        }

        return response;
    }

    public TreasureResponseDto generateResponse(TreasureRequestDto results) {
        List<Position> generatedTreasures = generateTreasures();
        return checkResults(results, generatedTreasures);
    }

    private List<Position> generateTreasures() {
        Set<Position> treasures = new HashSet<>();
        while (treasures.size() != 3) {
            treasures.add(generateTreasure());
        }
        return new ArrayList<>(treasures);
    }

    private Position generateTreasure() {
        Random random = new Random();
        return Position.builder()
                .columnPosition(random.nextInt(5 - 1) + 1)
                .rowPosition(random.nextInt(5 - 1) + 1)
                .build();
    }

    private int validateMoves(List<Position> moves, List<Position> treasureLocations) {
        int foundTreasures = 0;
        for (Position move : moves) {
            int minToTreasureRow = 5;
            int minToTreasureColumn = 5;
            int total = minToTreasureRow + minToTreasureColumn;

            for (Position treasureLocation : treasureLocations) {
                int columnDifference = Math.abs(move.getColumnPosition() - treasureLocation.getColumnPosition());
                int rowDifference = Math.abs(move.getRowPosition() - treasureLocation.getRowPosition());
                int differenceSum = columnDifference + rowDifference;
                if (differenceSum < total) total = differenceSum;
            }
            switch (total) {
                case 0:
                    move.setResult('T');
                    move.setTreasure(true);
                    ++foundTreasures;
                    break;
                case 1:
                    move.setResult('3');
                    move.setTreasure(false);
                    break;
                case 2:
                    move.setResult('2');
                    move.setTreasure(false);
                    break;
                default:
                    move.setResult('1');
                    move.setTreasure(false);
            }
        }
        return foundTreasures;
    }
}
