package com.example.springboot.service;

import com.example.springboot.entity.Position;
import com.example.springboot.entity.TreasureRequestDto;
import com.example.springboot.entity.TreasureResponseDto;

import java.util.List;

public interface TreasureService {
    TreasureResponseDto generateResponse(TreasureRequestDto results);

    List<Position> generateTreasures();

    TreasureResponseDto checkResults(TreasureRequestDto results, List<Position> treasureLocations);
}
