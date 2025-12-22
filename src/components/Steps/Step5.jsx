import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step5 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    const [selectedKotel, setSelectedKotel] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedKotel(value);
        updateFormData({ Одинаковые_или_разные_котлы: value });
        clearError('котлы'); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation fields object
        const fields = {
            котлы: selectedKotel,  
            котлы_rules: { required: true },  
        };

        const isValid = validateAll(fields);
        if (!isValid) {

            return;
        }
        
        onNext(selectedKotel); // We pass the value to onNext - a transition with a condition
    };

    return (
        <div>
            <h4>Одинаковые или разные котлы</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        id="option1"
                        name="step5"
                        value="Все котлы одинаковые"
                        checked={selectedKotel === "Все котлы одинаковые"}
                        onChange={handleChange}
                    />
                    Все котлы одинаковые
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option2"
                        name="step5"
                        value="Разные котлы"
                        checked={selectedKotel === "Разные котлы"}
                        onChange={handleChange}
                    />
                    Разные котлы
                </label>
                <br />
                
                {errors.котлы && <p className="error">{errors.котлы}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step5;