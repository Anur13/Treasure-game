package com.example.springboot.service;

import com.example.springboot.entity.Position;
import com.example.springboot.entity.TreasureRequestDto;
import com.example.springboot.entity.TreasureResponseDto;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
public class TreasureServiceTest {
    @TestConfiguration
    static class EmployeeServiceImplTestContextConfiguration {
        @Bean
        public DefaultTreasureService treasureService() {
            return new DefaultTreasureService();
        }
    }

    @Autowired
    DefaultTreasureService treasureService;

    @Test
    @DisplayName("Generate treasures should return 3 unique positions")
    public void testGenerateTreasures() {
        List<Position> treasures = treasureService.generateTreasures();
        Set<Position> uniqueTreasures = new HashSet<>(treasures);
        assertEquals(treasures.size(), uniqueTreasures.size());
    }

    @Test
    @DisplayName("Given known input and generated treasures, result should be 3")
    public void validateClosePosition() {
        List<Position> reqMoves = new ArrayList<>();
        reqMoves.add(Position.builder()
                .columnPosition(2)
                .rowPosition(2)
                .build());

        TreasureRequestDto mockReq = TreasureRequestDto.builder()
                .moves(reqMoves)
                .playerName("Test")
                .turns(3)
                .build();

        TreasureResponseDto res = treasureService.checkResults(mockReq, generateKnownTreasures());
        assertEquals('3', res.getMoves().get(0).getResult());
    }

    @Test
    @DisplayName("Given known input and generated treasures, result should be 2")
    public void validateMidPosition() {
        List<Position> reqMoves = new ArrayList<>();
        reqMoves.add(Position.builder()
                .columnPosition(2)
                .rowPosition(3)
                .build());

        TreasureRequestDto mockReq = TreasureRequestDto.builder()
                .moves(reqMoves)
                .playerName("Test")
                .turns(3)
                .build();

        TreasureResponseDto res = treasureService.checkResults(mockReq, generateKnownTreasures());
        assertEquals('2', res.getMoves().get(0).getResult());
    }

    @Test
    @DisplayName("Given known input and generated treasures, result should be 1")
    public void validateFarPosition() {
        List<Position> reqMoves = new ArrayList<>();
        reqMoves.add(Position.builder()
                .columnPosition(3)
                .rowPosition(3)
                .build());

        TreasureRequestDto mockReq = TreasureRequestDto.builder()
                .moves(reqMoves)
                .playerName("Test")
                .turns(3)
                .build();

        TreasureResponseDto res = treasureService.checkResults(mockReq, generateKnownTreasures());
        assertEquals('1', res.getMoves().get(0).getResult());
    }

    @Test
    @DisplayName("Given known input and generated treasures, result should be T")
    public void validateTreasurePosition() {
        List<Position> reqMoves = new ArrayList<>();
        reqMoves.add(Position.builder()
                .columnPosition(1)
                .rowPosition(1)
                .build());

        TreasureRequestDto mockReq = TreasureRequestDto.builder()
                .moves(reqMoves)
                .playerName("Test")
                .turns(3)
                .build();

        TreasureResponseDto res = treasureService.checkResults(mockReq, generateKnownTreasures());
        assertEquals('T', res.getMoves().get(0).getResult());
    }


    @Test
    @DisplayName("Should return foundTreasure = 3  after finding all treasures")
    public void validateAllTreasures() {
        List<Position> reqMoves = new ArrayList<>();
        reqMoves.add(Position.builder()
                .columnPosition(1)
                .rowPosition(1)
                .build());

        reqMoves.add(Position.builder()
                .columnPosition(3)
                .rowPosition(1)
                .build());

        reqMoves.add(Position.builder()
                .columnPosition(2)
                .rowPosition(1)
                .build());


        TreasureRequestDto mockReq = TreasureRequestDto.builder()
                .moves(reqMoves)
                .playerName("Test")
                .turns(3)
                .build();

        TreasureResponseDto res = treasureService.checkResults(mockReq, generateKnownTreasures());
        assertEquals(2, res.getFoundTreasures());


        reqMoves = new ArrayList<>();
        reqMoves.add(Position.builder()
                .columnPosition(1)
                .rowPosition(2)
                .build());

        reqMoves.add(Position.builder()
                .columnPosition(3)
                .rowPosition(3)
                .build());

        reqMoves.add(Position.builder()
                .columnPosition(2)
                .rowPosition(3)
                .build());

        mockReq.setMoves(reqMoves);

        res = treasureService.checkResults(mockReq, generateKnownTreasures());
        assertEquals(3, res.getFoundTreasures());
    }

    @Test
    @DisplayName("Should return highscores after finding all treasures")
    public void validateHighscores() {
        List<Position> reqMoves = new ArrayList<>();
        reqMoves.add(Position.builder()
                .columnPosition(1)
                .rowPosition(1)
                .build());

        reqMoves.add(Position.builder()
                .columnPosition(1)
                .rowPosition(2)
                .build());

        reqMoves.add(Position.builder()
                .columnPosition(2)
                .rowPosition(1)
                .build());

        TreasureResponseDto res = null;
        for (int i = 1; i < 11; i++) {
            TreasureRequestDto mockReq = TreasureRequestDto.builder()
                    .moves(reqMoves)
                    .playerName("Test" + i)
                    .turns(i)
                    .build();

            res = treasureService.checkResults(mockReq, generateKnownTreasures());
        }

        assertEquals(10, res.getHighScores().size());
        assertEquals(1, res.getHighScores().get(0).getScore());
        assertEquals(10, res.getHighScores().get(9).getScore());
    }

    public List<Position> generateKnownTreasures() {
        List<Position> list = new ArrayList<>();
        list.add(Position.builder()
                .rowPosition(1)
                .columnPosition(1)
                .build());

        list.add(Position.builder()
                .rowPosition(1)
                .columnPosition(2)
                .build());

        list.add(Position.builder()
                .rowPosition(2)
                .columnPosition(1)
                .build());
        return list;
    }
}
