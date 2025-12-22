import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  // Путь к хуку (адаптируйте)

const Step6 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    const [selectedKotel, setSelectedKotel] = useState('');


    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedKotel(value);
        updateFormData({ Марка_или_модель_котла: value });
        clearError('kotelModel');  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation fields object
        const fields = {
            kotelModel: selectedKotel,  
            kotelModel_rules: { required: true },  
        };

        const isValid = validateAll(fields);
        if (!isValid) {
          
            return;
        }
        onNext(selectedKotel);  // We pass the value to onNext - a transition with a condition
    };

    return (
        <div>
            <h4>Марка или модель котла</h4>
            <form onSubmit={handleSubmit}>
                <select 
                    id="mySelect" 
                    name="step6" 
                    value={selectedKotel}  
                    onChange={handleChange}
                >
                    <option value="">Выберите марку</option>  
                    <option value="Bosh">Bosh</option>
                    <option value="Protherm">Protherm</option>
                    <option value="Acrus">Acrus</option>
                    <option value="Baxi">Baxi</option>
                    <option value="Другой котел">Другой котел</option>
                </select>
                
                {errors.kotelModel && <p className="error">{errors.kotelModel}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step6;