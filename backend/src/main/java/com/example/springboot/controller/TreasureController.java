package com.example.springboot.controller;

import com.example.springboot.entity.TreasureRequestDto;
import com.example.springboot.entity.TreasureResponseDto;
import com.example.springboot.service.DefaultTreasureService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TreasureController {
    @Autowired
    DefaultTreasureService defaultTreasureService;

    Logger logger = LoggerFactory.getLogger(TreasureController.class);

    @PostMapping("/")
    public TreasureResponseDto index(@RequestBody TreasureRequestDto result) {
        logger.info(String.valueOf(result));

//        return treasureService.checkResults(result);
        return defaultTreasureService.generateResponse(result);
    }

}
