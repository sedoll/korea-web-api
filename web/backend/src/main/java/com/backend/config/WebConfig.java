package com.backend.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${domain.url}")
    private String ALLOWED_ORIGIN;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 원하는 API 경로에만 적용
                .allowedOrigins(ALLOWED_ORIGIN) // React 도메인
                .allowedMethods("GET", "POST")
                .allowedHeaders("*")
                .allowCredentials(false); // 필요시 true
    }
}
