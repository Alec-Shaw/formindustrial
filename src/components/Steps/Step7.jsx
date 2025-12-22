import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation'; 

const Step7 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    const [selectedFuel, setSelectedFuel] = useState('');
    //const [customFuel, setCustomFuel] = useState('');  


    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedFuel(value);
       // setCustomFuel('');  
        updateFormData({ Тип_топлива: value });
        clearError('fuelType'); 
    };

    // const handleCustomFuelChange = (e) => {
    //     const value = e.target.value;
    //     setCustomFuel(value);
    //     updateFormData({ Тип_топлива: value }); 
    //     clearError('fuelType');
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation fields object
        const fields = {
            fuelType: selectedFuel,  
            fuelType_rules: { required: true }, 
        };

        if (selectedFuel === 'Свой вариант') {
           // fields.customFuel = customFuel;
            fields.customFuel_rules = { required: true };
        }

        const isValid = validateAll(fields);
        if (!isValid) {
            
            return;
        }
        onNext(selectedFuel);  // We pass the value to onNext - a transition with a condition
        
    };

    return (
        <div>
            <h4>Тип топлива</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        id="option1"
                        name="step7"
                        value="Газ"
                        checked={selectedFuel === "Газ"}
                        onChange={handleChange}
                    />
                    Газ
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option2"
                        name="step7"
                        value="Дизель"
                        checked={selectedFuel === "Дизель"}
                        onChange={handleChange}
                    />
                    Дизель
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option3"
                        name="step7"
                        value="Газ/дизел"
                        checked={selectedFuel === "Газ/дизел"}
                        onChange={handleChange}
                    />
                    Газ/дизел
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option4"
                        name="step7"
                        value="Дрова"
                        checked={selectedFuel === "Дрова"}
                        onChange={handleChange}
                    />
                    Дрова
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option5"
                        name="step7"
                        value="Уголь"
                        checked={selectedFuel === "Уголь"}
                        onChange={handleChange}
                    />
                    Уголь
                </label>
                <br />
                {/* <label>
                    <input
                        type="radio"
                        id="option6"
                        name="step7"
                        value="Свой вариант"
                        checked={selectedFuel === "Свой вариант"}
                        onChange={handleChange}
                    />
                    <span>Свой вариант</span>
                    {selectedFuel === 'Свой вариант' && (
                        <input
                            type="text"
                            placeholder="Введите свой вариант"
                            value={customFuel}
                            onChange={handleCustomFuelChange}
                            style={{ marginLeft: '10px', display: 'block' }}
                        />
                    )}
                </label> */}
                
                {errors.fuelType && <p className="error">{errors.fuelType}</p>}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step7;