import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step1 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();
  
    const [selectedConnection, setSelectedConnection] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedConnection(value);
        updateFormData({ Подключение_вывод_котлов: value });
        clearError('подключение');  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation fields object
        const fields = {
            подключение: selectedConnection,  
            подключение_rules: { required: true },  
        };

        const isValid = validateAll(fields);
        if (!isValid) {
            return;
        }
        onNext();  
    };

    return (
        <div>
            <h4>Подключение, вывод котлов</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        id="option1"
                        name="step1"
                        value="На каждый котел свой отдельный дымоход"
                        checked={selectedConnection === "На каждый котел свой отдельный дымоход"}
                        onChange={handleChange}
                    />
                    На каждый котел свой отдельный дымоход
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option2"
                        name="step1"
                        value="Несколько котлов в один вертикальный дымоход"
                        checked={selectedConnection === "Несколько котлов в один вертикальный дымоход"}
                        onChange={handleChange}
                    />
                    Несколько котлов в один вертикальный дымоход
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option3"
                        name="step1"
                        value="Несколько котлов с общим горизонтальным участком"
                        checked={selectedConnection === "Несколько котлов с общим горизонтальным участком"}
                        onChange={handleChange}
                    />
                    Несколько котлов с общим горизонтальным участком
                </label>
                
                {errors.подключение && <p className="error">{errors.подключение}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step1;