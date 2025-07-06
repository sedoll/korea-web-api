import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCulturalEvents } from '../api/seoulApi';

const CulturalEventContext = createContext();

export const CulturalEventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [pageIndex] = useState(1); // 고정
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchCulturalEvents(pageIndex, pageSize)
            .then(data => {
                // 추가 데이터 붙이기 (중복체크 필요시 추가로 구현)
                setEvents(data.culturalEventInfo.row || []);
            })
            .catch(error => {
                console.error('Error fetching cultural events:', error);
            })
            .finally(() => setLoading(false));
    }, [pageIndex, pageSize]);

    // 더보기 함수
    const loadMore = () => {
        setPageSize(prev => prev + 10);
    };

    return (
        <CulturalEventContext.Provider value={{ events, loadMore, loading }}>
            {children}
        </CulturalEventContext.Provider>
    );
};

export const useCulturalEvents = () => useContext(CulturalEventContext);
