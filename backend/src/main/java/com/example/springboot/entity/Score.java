package com.example.springboot.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Score {
    private String playerName;
    private int score;
}
