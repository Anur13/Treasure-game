package com.example.springboot.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Position {
    private int rowPosition;
    private int columnPosition;
    private char result;
    private boolean isTreasure;
}
