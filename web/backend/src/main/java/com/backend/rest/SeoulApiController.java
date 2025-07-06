package com.backend.rest;

import com.backend.dto.CulturalEventResponse;
import com.backend.service.SeoulEventService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// SeoulApiController.java
@RestController
@RequestMapping("/seoul")
@Slf4j
public class SeoulApiController {

    private final SeoulEventService seoulEventService;

    public SeoulApiController(SeoulEventService seoulEventService) {
        this.seoulEventService = seoulEventService;
    }

    @GetMapping("/cultural-events")
    public ResponseEntity<CulturalEventResponse> getCulturalEvents(
            @RequestParam(defaultValue = "1") int pageIndex,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        if (pageIndex < 90) {
            CulturalEventResponse response = seoulEventService.getCulturalEvents(pageIndex, pageSize);
            log.info("Calling Seoul API: {}", response);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
