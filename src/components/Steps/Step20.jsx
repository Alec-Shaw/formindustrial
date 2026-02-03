import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step20 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();
  
    const [selectedConnection, setSelectedConnection] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedConnection(value);
        updateFormData({ Что_чертить: value });
        clearError('connection');  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation fields object
        const fields = {
            connection: selectedConnection,  
            connection_rules: { required: true },  
        };

        const isValid = validateAll(fields);
        if (!isValid) {
            return;
        }
        onNext();  
    };

    return (
        <div>
            <h4>Что чертить. Схема и спецификация</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        id="option1"
                        name="step20"
                        value="Горизонтальный (газоход)"
                        checked={selectedConnection === "Горизонтальный (газоход)"}
                        onChange={handleChange}
                    />
                    Горизонтальный (газоход)
                </label>
                
                <label>
                    <input
                        type="radio"
                        id="option2"
                        name="step20"
                        value="Вертикальный (дымоход)"
                        checked={selectedConnection === "Вертикальный (дымоход)"}
                        onChange={handleChange}
                    />
                    Вертикальный (дымоход)
                </label>

                <label>
                    <input
                        type="radio"
                        id="option2"
                        name="step20"
                        value="Горизонтальный + Вертикальный"
                        checked={selectedConnection === "Горизонтальный + Вертикальный"}
                        onChange={handleChange}
                    />
                    Горизонтальный + Вертикальный
                </label>

                {errors.connection && <p className="error">{errors.connection}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step20;