package com.backend.component;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OriginCheckFilter implements Filter {

    @Value("${domain.url}")
    private String ALLOWED_ORIGIN;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String origin = httpRequest.getHeader("Origin");
        String referer = httpRequest.getHeader("Referer");
        String apiKey = httpRequest.getHeader("X-API-KEY"); // 선택적

        boolean originAllowed = origin == null || origin.startsWith(ALLOWED_ORIGIN);
        boolean refererAllowed = referer == null || referer.startsWith(ALLOWED_ORIGIN);

        // 필수: 둘 중 하나라도 Origin/Referer 이상하면 차단
        if (!originAllowed || !refererAllowed) {
            httpResponse.sendError(HttpStatus.FORBIDDEN.value(), "Access Denied");
            return;
        }

        chain.doFilter(request, response);
    }
}
