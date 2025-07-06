import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/style.css';  // 위 CSS 파일 import

const BASE_URL = 'http://localhost:8080/seoul/cultural-events';

const CulturalEventList = () => {
    const [events, setEvents] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = () => {
        if (pageIndex > 100) return; // pageIndex가 100 이상이면 더보기 동작 안 함
        loadMore();
    };

    // 데이터 가져오기 함수
    const fetchEvents = async (pageIndex, pageSize) => {
        setLoading(true);
        try {
            const response = await axios.get(BASE_URL, {
                params: { pageIndex, pageSize },
            });
            // 기존 이벤트에 새 이벤트 추가
            setEvents(prevEvents => [...prevEvents, ...(response.data.culturalEventInfo?.row || [])]);
        } catch (error) {
            console.error('Error fetching cultural events:', error);
        } finally {
            setLoading(false);
        }
    };

    // 초기 데이터 및 pageIndex/pageSize 변경시 호출 (페이지네이션 대신 누적)
    useEffect(() => {
        fetchEvents(pageIndex, pageSize);
    }, [pageIndex, pageSize]);

    // 더보기 클릭 시, pageIndex 와 pageSize 10씩 증가시키기
    const loadMore = () => {
        setPageIndex(prev => prev + 10);
        setPageSize(prev => prev + 10);
        console.log(pageIndex);
    };

    return (
        <div className="container">
            <h2 className="title">서울 문화행사 목록</h2>

            <div className="event-grid">
                {events.map((event, idx) => (
                    <div key={idx} className="event-card" title={event.TITLE || '제목 없음'}>
                        <a href={event.HMPG_ADDR || '#'}
                           target="_blank"
                           rel="noopener noreferrer"
                           onClick={e => !event.HMPG_ADDR && e.preventDefault()}>
                            <img
                                src={event.MAIN_IMG || 'https://via.placeholder.com/400x250?text=No+Image'}
                                alt={event.TITLE || '이미지 없음'}
                                className="event-image"
                            />
                        </a>
                        <div className="event-content">
                            <a
                                href={event.HMPG_ADDR || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="event-title"
                                onClick={e => !event.HMPG_ADDR && e.preventDefault()}
                            >
                                {event.TITLE || '제목 없음'}
                            </a>
                            <p className="event-info"><strong>장르:</strong> {event.CODENAME || '정보 없음'}</p>
                            <p className="event-info"><strong>대상:</strong> {event.USE_TRGT || '정보 없음'}</p>
                            <p className="event-info"><strong>가격:</strong> {event.IS_FREE == '무료' ? '무료' : event.USE_FEE || '정보 없음'}</p>
                            <p className="event-info"><strong>장소:</strong> {event.PLACE || '정보 없음'}</p>
                            <p className="event-info"><strong>날짜:</strong> {event.DATE || '정보 없음'}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* pageIndex가 100 이상일 때 더보기 버튼 숨김 */}
            {pageIndex < 90 && (
                <div className="load-more-container">
                    <button onClick={handleLoadMore} className="load-more-btn">
                        더보기
                    </button>
                </div>
            )}
        </div>
    );
};

export default CulturalEventList;
