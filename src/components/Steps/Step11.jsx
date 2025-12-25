import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step11 = ({ formData, updateFormData, onBack, onNext }) => {
    const { errors, validateAll, clearError } = useFormValidation();
   
    const [expandedLength, setExpandedLength] = useState('');
    const [straightLength, setStraightLength] = useState('');

    const handleInBoilerRoom = (e) => {
        const value = e.target.value;
        setExpandedLength(value);
        updateFormData({ Длина_прямая_в_котельной: value });
        clearError('inBoilerRoom'); 
    };

    const handleOutBoilerRoom = (e) => {
        const value = e.target.value;
        setStraightLength(value);
        updateFormData({ Длина_прямая_на_улице: value });
        clearError('outBoilerRoom');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Объект полей для валидации (на английском для consistency с JSX)
        const fields = {
            inBoilerRoom: expandedLength,  // В котельной
            inBoilerRoom_rules: { required: true, number: true },  // Обязательно + число
            outBoilerRoom: straightLength,  // На улице
            outBoilerRoom_rules: { required: true, number: true },  // Обязательно + число
        };

        const isValid = validateAll(fields);
        if (!isValid) {
            // Нет alert — ошибки под полями
            return;
        }
        
        onNext();  // Переход
    };

    return (
        <div>
            <h4>Длина прямая в котельной или на улице</h4>
            
            <form onSubmit={handleSubmit}>
                <div className='quest'>В котельной</div>
                <label>
                    <input
                        type="text"
                        id="expanded"
                        name="expanded"
                        value={expandedLength}  // Локальное состояние
                        onChange={handleInBoilerRoom}
                        placeholder="Введите значение"
                    />
                </label>
                {errors.inBoilerRoom && <p className="error">{errors.inBoilerRoom}</p>}
                <br />
                <div className='quest'>На улице</div>
                <label>
                    <input
                        type="text"
                        id="elongate"
                        name="elongate"
                        value={straightLength}
                        onChange={handleOutBoilerRoom}
                        placeholder="Введите значение"
                    />
                </label>
                {errors.outBoilerRoom && <p className="error">{errors.outBoilerRoom}</p>}
                <br />
                
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step11;