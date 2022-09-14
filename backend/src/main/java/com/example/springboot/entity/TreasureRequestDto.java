package com.example.springboot.entity;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TreasureRequestDto {
    private String playerName;
    private int turns;
    private List<Position> moves;
}

