package com.example.springboot.entity;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TreasureResponseDto {
    private List<Position> moves;
    private int foundTreasures;
    private List<Score> highScores;

}
