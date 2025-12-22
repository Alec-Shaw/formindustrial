import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation'; 

const Step4 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();
    
    const [selectedRequirement, setSelectedRequirement] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedRequirement(value);
        updateFormData({ Что_требуется: value });
        clearError('требование');  
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation fields object
        const fields = {
            требование: selectedRequirement,  
            требование_rules: { required: true },  
        };

        const isValid = validateAll(fields);
        if (!isValid) {
        
            return;
        }
        onNext();  
    };

    return (
        <div>
            <h4>Что требуется</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        id="option1"
                        name="step4"
                        value="Только АЭ без чертежа"
                        checked={selectedRequirement === "Только АЭ без чертежа"}
                        onChange={handleChange}
                    />
                    Только АЭ без чертежа
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option2"
                        name="step4"
                        value="Только чертеж без АЭ"
                        checked={selectedRequirement === "Только чертеж без АЭ"}
                        onChange={handleChange}
                    />
                    Только чертеж без АЭ
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option3"
                        name="step4"
                        value="АЭ + Чертеж"
                        checked={selectedRequirement === "АЭ + Чертеж"}
                        onChange={handleChange}
                    />
                    АЭ + Чертеж
                </label>
                
                {errors.требование && <p className="error">{errors.требование}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step4;