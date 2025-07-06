import React from 'react';
import ReactDOM from 'react-dom/client';
import { CulturalEventProvider } from './context/CulturalEventContext';
import CulturalEventList from './pages/CulturalEventList';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CulturalEventProvider>
            <div className="max-w-2xl mx-auto">
                <CulturalEventList />
            </div>
        </CulturalEventProvider>
    </React.StrictMode>
);
