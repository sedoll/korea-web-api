const BASE_URL = 'http://localhost:8080/'; // Spring Boot 주소

export async function fetchHello() {
    const response = await fetch(`${BASE_URL}/hello`, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'your-hardcoded-key', // 스프링에서 검증하는 키
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch hello');
    }

    return response.text(); // 문자열 반환
}