import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step0 = ({ formData, updateFormData }) => {  
    const navigate = useNavigate();
    const { errors, validateAll, clearError } = useFormValidation();

    
    const [selectedType, setSelectedType] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedType(value);
        updateFormData({ Тип_дымоходной_системы: value });
        clearError('Тип_дымоходной_системы');  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation fields object
        const fields = {
            тип: selectedType, 
            тип_rules: { required: true },  
        };

        const isValid = validateAll(fields);
        if (!isValid) {
            
            return;
        }

        // Navigate
        if (selectedType === "Промышленная") {
            navigate('/industrial');
        } else if (selectedType === "Поквартирная") {
            navigate('/apartment');  
        } else if (selectedType === "ДРОП") {
            navigate('/drop');  
        }
    };

    return (
        <div>
            <h3>Тип дымоходной системы</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="radio" 
                        name="step0" 
                        value="Промышленная" 
                        checked={selectedType === "Промышленная"}  
                        onChange={handleChange}
                    />
                    Промышленная
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        name="step0" 
                        value="Поквартирная" 
                        checked={selectedType === "Поквартирная"}
                        onChange={handleChange}
                    />
                    Поквартирная коллективная
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        name="step0" 
                        value="ДРОП" 
                        checked={selectedType === "ДРОП"}
                        onChange={handleChange}
                    />
                    ДРОП (конденсационная)
                </label>
                <br />
                
                {errors.тип && <p className="error">{errors.тип}</p>}
                <br />
                <button type="submit">Продолжить</button>
            </form>
        </div>
    );
};

export default Step0;