package com.example.springboot.entity;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GameData {
    private List<Position> treasureLocations;
    private int foundTreasures;
}
