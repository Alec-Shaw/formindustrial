import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Step0 from './components/Steps/Step0';
import IndustrialBranch from './components/Branches/IndustrialBranch';

function App() {
    const [formData, setFormData] = useState({}); // Глобальное состояние ответов

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    return (
        <Router>
            <div className="App" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Step0 updateFormData={updateFormData} />} />
                    <Route path="/industrial" element={<IndustrialBranch formData={formData} updateFormData={updateFormData} />} />
                    {/* Добавь роуты для других веток */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;