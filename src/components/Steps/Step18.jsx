import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step18 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();
  
    const [selectedConnection, setSelectedConnection] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedConnection(value);
        updateFormData({ Высота_при_прочерчивании: value });
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
            <h4>Высота при прочерчивании</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        id="option1"
                        name="step1"
                        value="Строго ограничена (подогнать нестандартными элементами)"
                        checked={selectedConnection === "Строго ограничена (подогнать нестандартными элементами)"}
                        onChange={handleChange}
                    />
                    Строго ограничена (подогнать нестандартными элементами)
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option2"
                        name="step1"
                        value="Сделать не менее (стандартными элементами)"
                        checked={selectedConnection === "Сделать не менее (стандартными элементами)"}
                        onChange={handleChange}
                    />
                    Сделать не менее (стандартными элементами)
                </label>
                
                {errors.connection && <p className="error">{errors.connection}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step18;