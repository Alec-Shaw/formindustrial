import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step17 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();
  
    const [selectedConnection, setSelectedConnection] = useState('');
    const [customLink, setCustomLink] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedConnection(value);
        updateFormData({ step17: value });
        clearError('connection'); 
        if (value !== 'Свой вариант') {
            clearError('customLink');  
        } 
    };

    const handleVisotaChange = (e) => {
        const value = e.target.value;
        setCustomLink(value);
        updateFormData({ customLink: value });
        clearError('customLink');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation fields object
        const fields = {
            connection: selectedConnection,  
            connection_rules: { required: true },  
        };

         if (selectedConnection === 'Свой вариант') {
            fields.customLink = customLink;
            fields.customLink_rules = { required: true };  
        }

        const isValid = validateAll(fields);
        if (!isValid) {
            return;
        }
        onNext();  
    };

    return (
        <div>
            <h4>Схема или размеры</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        id="step17"
                        name="step17"
                        value="Заполнить размеры"
                        checked={selectedConnection === "Заполнить размеры"}
                        onChange={handleChange}
                    />
                    Заполнить размеры
                </label>
                
                    <label>
                        <input
                            type="radio"
                            name="step2"
                            value="Свой вариант"
                            checked={selectedConnection === 'Свой вариант'}
                            onChange={handleChange}
                        />
                        Приложить схему файлом
                        <div className="img_choos">
                            
                            {selectedConnection === 'Свой вариант' && (
                                <input
                                    type="text"
                                    placeholder="Вставьте ссылку на файл"
                                    value={customLink}
                                    onChange={handleVisotaChange}
                                    style={{ marginLeft: '10px' }}
                                />
                            )}
                        </div>
                    </label>
                {errors.connection && <p className="error">{errors.connection}</p>}
                {errors.customLink && <p className="error">{errors.customLink}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step17;