package com.backend.service;

import com.backend.dto.CulturalEventResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class SeoulEventService {

    @Value("${api.key.seoul}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public CulturalEventResponse getCulturalEvents(int pageIndex, int pageSize) {
        String apiUrl = String.format(
                "http://openapi.seoul.go.kr:8088/%s/json/culturalEventInfo/%d/%d/",
                apiKey, pageIndex, pageSize
        );

        log.info("Calling Seoul API: {}", apiUrl);

        return restTemplate.getForObject(apiUrl, CulturalEventResponse.class);
    }
}
